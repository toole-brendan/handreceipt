use std::sync::Arc;
use crate::scanner::Scanner;

mod error;
mod scanner;
mod offline;
mod sync;
mod security;

pub use error::Error;
pub type Result<T> = std::result::Result<T, Error>;

/// Core mobile functionality for HandReceipt
#[derive(Clone)]
pub struct HandReceiptMobile {
    scanner: Arc<scanner::QRScanner>,
    storage: Arc<offline::Storage>,
    sync: Arc<sync::SyncManager>,
}

impl HandReceiptMobile {
    pub async fn new() -> Result<Self> {
        let storage = Arc::new(offline::Storage::new().await?);
        let security = Arc::new(security::SecurityManager::new()?);
        let scanner = Arc::new(scanner::QRScanner::new(storage.clone(), security.clone()));
        let sync = Arc::new(sync::SyncManager::new(storage.clone()));

        Ok(Self {
            scanner,
            storage,
            sync,
        })
    }

    pub async fn initialize(&self) -> Result<()> {
        self.scanner.initialize().await?;
        self.sync.start().await?;
        Ok(())
    }

    pub async fn scan_qr(&self) -> Result<scanner::ScanResult> {
        self.scanner.scan().await
    }

    pub async fn verify_transfer(&self, scan_result: scanner::ScanResult) -> Result<bool> {
        self.scanner.verify_transfer(scan_result).await
    }

    pub async fn sync_pending_transfers(&self) -> Result<()> {
        self.sync.sync_pending().await
    }
}

// FFI exports for iOS
#[cfg(target_os = "ios")]
mod ios {
    use super::*;
    use std::ffi::{c_void, CString};
    use std::os::raw::c_char;

    #[no_mangle]
    pub extern "C" fn mobile_core_new() -> *mut c_void {
        // Implementation for iOS
        std::ptr::null_mut()
    }
}

// FFI exports for Android
#[cfg(target_os = "android")]
mod android {
    use super::HandReceiptMobile;
    use jni::JNIEnv;
    use jni::objects::JClass;
    use jni::sys::{jlong, jstring};

    #[no_mangle]
    pub extern "system" fn Java_com_handreceipt_MobileCore_scanQR(
        env: JNIEnv,
        _class: JClass,
        core_ptr: jlong,
    ) -> jstring {
        // Implementation for Android
        std::ptr::null_mut()
    }
} 