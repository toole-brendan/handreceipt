use serde::{Deserialize, Serialize};

pub mod app;
pub mod asset;
pub mod audit;
pub mod blockchain;
pub mod error;
pub mod mesh;
pub mod permissions;
pub mod scanning;
pub mod security;
pub mod signature;
pub mod sync;
pub mod verification;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppConfig {
    pub server: ServerConfig,
    pub database: DatabaseConfig,
    pub security: SecurityConfig,
    pub mesh: MeshConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
    pub workers: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DatabaseConfig {
    pub url: String,
    pub max_connections: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SecurityConfig {
    pub encryption_key: String,
    pub jwt_secret: String,
    pub mfa_enabled: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MeshConfig {
    pub discovery_port: u16,
    pub sync_interval: u64,
    pub max_peers: usize,
}

pub type ServiceResult<T> = Result<T, error::CoreError>;
