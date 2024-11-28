use sqlx::{Row, SqlitePool};
use std::path::Path;
use uuid::Uuid;

use crate::error::Error;
use crate::scanner::ScanResult;

pub struct Storage {
    pool: SqlitePool,
}

impl Storage {
    pub async fn new() -> Result<Self, Error> {
        let db_path = Path::new("handreceipt.db");
        let pool = SqlitePool::connect(&format!("sqlite:{}", db_path.display())).await?;

        // Ensure tables exist
        sqlx::query(r#"
            CREATE TABLE IF NOT EXISTS transfers (
                id TEXT PRIMARY KEY,
                property_id TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                scan_data TEXT NOT NULL,
                sync_status TEXT NOT NULL,
                retry_count INTEGER NOT NULL DEFAULT 0
            )
        "#)
        .execute(&pool)
        .await?;

        Ok(Self { pool })
    }

    pub async fn store_transfer(&self, transfer: &ScanResult) -> Result<(), Error> {
        sqlx::query(r#"
            INSERT INTO transfers 
            (id, property_id, timestamp, scan_data, sync_status, retry_count)
            VALUES (?, ?, ?, ?, ?, ?)
        "#)
        .bind(Uuid::new_v4().to_string())
        .bind(transfer.property_id.to_string())
        .bind(transfer.timestamp.to_rfc3339())
        .bind(serde_json::to_string(transfer)?)
        .bind("PENDING")
        .bind(0)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    pub async fn get_pending_transfers(&self) -> Result<Vec<ScanResult>, Error> {
        let rows = sqlx::query("SELECT * FROM transfers WHERE sync_status = 'PENDING'")
            .fetch_all(&self.pool)
            .await?;

        let mut transfers = Vec::new();
        for row in rows {
            let scan_data: String = row.get(3);

            // Deserialize scan_data back to ScanResult
            let transfer: ScanResult = serde_json::from_str(&scan_data)?;

            transfers.push(transfer);
        }

        Ok(transfers)
    }
} 