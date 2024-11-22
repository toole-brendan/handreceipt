use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Nonce,
};
use ring::rand::SystemRandom;
use std::error::Error;

pub struct EncryptionService {
    cipher: Aes256Gcm,
    rng: SystemRandom,
}

impl EncryptionService {
    pub fn new(key: &[u8; 32]) -> Self {
        let cipher = Aes256Gcm::new_from_slice(key)
            .expect("Failed to initialize encryption cipher");
        let rng = SystemRandom::new();
        Self { cipher, rng }
    }

    pub fn encrypt(&self, data: &[u8]) -> Result<Vec<u8>, Box<dyn Error>> {
        let mut nonce_bytes = [0u8; 12];
        ring::rand::SecureRandom::fill(&self.rng, &mut nonce_bytes)
            .map_err(|e| format!("Failed to generate nonce: {:?}", e))?;
        let nonce = Nonce::from_slice(&nonce_bytes);

        let ciphertext = self.cipher
            .encrypt(nonce, data)
            .map_err(|e| format!("Encryption failed: {}", e))?;

        // Prepend nonce to ciphertext for decryption
        let mut result = Vec::with_capacity(nonce_bytes.len() + ciphertext.len());
        result.extend_from_slice(&nonce_bytes);
        result.extend_from_slice(&ciphertext);
        Ok(result)
    }

    pub fn decrypt(&self, data: &[u8]) -> Result<Vec<u8>, Box<dyn Error>> {
        if data.len() < 12 {
            return Err("Invalid encrypted data".into());
        }

        let (nonce_bytes, ciphertext) = data.split_at(12);
        let nonce = Nonce::from_slice(nonce_bytes);

        self.cipher
            .decrypt(nonce, ciphertext)
            .map_err(|e| format!("Decryption failed: {}", e).into())
    }
}

#[derive(Debug, thiserror::Error)]
pub enum EncryptionError {
    #[error("Encryption failed: {0}")]
    EncryptionFailed(String),

    #[error("Decryption failed: {0}")]
    DecryptionFailed(String),

    #[error("Invalid key: {0}")]
    InvalidKey(String),

    #[error("Random number generation failed: {0}")]
    RngError(String),

    #[error("Key generation failed")]
    KeyGenerationFailed,
}