mod qr;
pub use qr::QRScanner;

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Location {
    pub latitude: f64,
    pub longitude: f64,
    pub timestamp: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScanResult {
    pub property_id: Uuid,
    pub timestamp: DateTime<Utc>,
    pub location: Option<Location>,
    pub signature: String,
    pub scan_type: String,
}

#[async_trait]
pub trait Scanner {
    async fn initialize(&self) -> crate::Result<()>;
    async fn scan(&self) -> crate::Result<ScanResult>;
    async fn verify_transfer(&self, scan_result: ScanResult) -> crate::Result<bool>;
    async fn stop(&self) -> crate::Result<()>;
} 