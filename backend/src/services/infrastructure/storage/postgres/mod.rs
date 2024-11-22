pub mod repositories;
pub mod migrations;
pub mod extensions;
pub mod models;

use async_trait::async_trait;
use tokio_postgres::{Client, Row, Transaction};
use std::pin::Pin;
use futures::Future;
use crate::types::error::CoreError;
use super::{DatabaseConnection, StorageResult};

pub struct PostgresConnection {
    client: Client,
}

impl PostgresConnection {
    pub fn new(client: Client) -> Self {
        Self { client }
    }

    pub async fn transaction<'a, F, T>(&'a self, f: F) -> StorageResult<T>
    where
        F: for<'b> FnOnce(&'b mut Transaction<'b>) -> Pin<Box<dyn Future<Output = StorageResult<T>> + Send + 'b>> + Send + 'a,
        T: Send + 'static,
    {
        let tx = self.client.transaction()
            .await
            .map_err(|e| CoreError::Database(e.to_string()))?;

        let mut tx = tx;
        let result = f(&mut tx).await;

        match result {
            Ok(value) => {
                tx.commit()
                    .await
                    .map_err(|e| CoreError::Database(e.to_string()))?;
                Ok(value)
            }
            Err(e) => {
                let _ = tx.rollback().await;
                Err(e)
            }
        }
    }

    pub async fn execute_in_transaction<'a, F, T>(&'a self, f: F) -> StorageResult<T>
    where
        F: FnOnce(&mut Transaction<'_>) -> Pin<Box<dyn Future<Output = StorageResult<T>> + Send + '_>> + Send + 'a,
        T: Send + 'static,
    {
        let tx = self.client.transaction()
            .await
            .map_err(|e| CoreError::Database(e.to_string()))?;

        let mut tx = tx;
        let result = f(&mut tx).await;

        match result {
            Ok(value) => {
                tx.commit()
                    .await
                    .map_err(|e| CoreError::Database(e.to_string()))?;
                Ok(value)
            }
            Err(e) => {
                let _ = tx.rollback().await;
                Err(e)
            }
        }
    }
}

#[async_trait]
impl DatabaseConnection for PostgresConnection {
    async fn execute(&self, query: &str, params: &[&(dyn tokio_postgres::types::ToSql + Sync)]) -> StorageResult<u64> {
        self.client.execute(query, params)
            .await
            .map_err(|e| CoreError::Database(e.to_string()))
    }

    async fn query(&self, query: &str, params: &[&(dyn tokio_postgres::types::ToSql + Sync)]) -> StorageResult<Vec<Row>> {
        self.client.query(query, params)
            .await
            .map_err(|e| CoreError::Database(e.to_string()))
    }
}
