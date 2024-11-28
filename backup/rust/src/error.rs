use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {
    #[error("Scanner error: {0}")]
    Scanner(String),

    #[error("Storage error: {0}")]
    Storage(String),

    #[error("Security error: {0}")]
    Security(String),

    #[error("Sync error: {0}")]
    Sync(String),

    #[error("Invalid QR code: {0}")]
    InvalidQR(String),

    #[error("Transfer error: {0}")]
    Transfer(String),

    #[error("Network error: {0}")]
    Network(String),

    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("Serialization error: {0}")]
    Serialization(#[from] serde_json::Error),

    #[error("System error: {0}")]
    System(String),
}

impl Error {
    pub fn error_code(&self) -> i32 {
        match self {
            Error::Scanner(_) => 1000,
            Error::Storage(_) => 2000,
            Error::Security(_) => 3000,
            Error::Sync(_) => 4000,
            Error::InvalidQR(_) => 5000,
            Error::Transfer(_) => 6000,
            Error::Network(_) => 7000,
            Error::Database(_) => 8000,
            Error::Serialization(_) => 9000,
            Error::System(_) => 10000,
        }
    }
} 