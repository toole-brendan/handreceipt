use ed25519_dalek::{Signature, VerifyingKey, Verifier};
use std::convert::TryInto;

use crate::error::Error;

pub struct SecurityManager {}

impl SecurityManager {
    pub fn new() -> Result<Self, Error> {
        Ok(Self {})
    }

    pub fn verify_signature(
        &self, 
        public_key: &[u8], 
        message: &[u8], 
        signature_bytes: &[u8]
    ) -> Result<bool, Error> {
        // Convert public key
        let verifying_key = VerifyingKey::from_bytes(
            public_key.try_into().map_err(|_| 
                Error::Security("Invalid public key length".to_string())
            )?
        ).map_err(|_| Error::Security("Invalid public key format".to_string()))?;

        // Convert signature
        let signature = Signature::from_bytes(
            signature_bytes.try_into().map_err(|_| 
                Error::Security("Invalid signature length".to_string())
            )?
        );

        // Verify signature
        verifying_key.verify(message, &signature)
            .map_err(|e| Error::Security(format!("Signature verification failed: {}", e)))
            .map(|_| true)
    }
} 