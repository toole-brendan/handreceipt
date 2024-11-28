use std::ffi::{c_void, CStr, CString};
use std::os::raw::c_char;
use std::sync::Arc;
use tokio::runtime::Runtime;
use image::{GrayImage, ImageBuffer};

use crate::{HandReceiptMobile, Result, scanner::QRScanResult};

#[no_mangle]
pub extern "C" fn mobile_core_new() -> *mut c_void {
    let runtime = match Runtime::new() {
        Ok(rt) => rt,
        Err(_) => return std::ptr::null_mut(),
    };

    let core = match runtime.block_on(HandReceiptMobile::new()) {
        Ok(core) => core,
        Err(_) => return std::ptr::null_mut(),
    };

    let boxed = Box::new((runtime, core));
    Box::into_raw(boxed) as *mut c_void
}

#[no_mangle]
pub extern "C" fn mobile_core_free(ptr: *mut c_void) {
    if !ptr.is_null() {
        unsafe {
            let _ = Box::from_raw(ptr as *mut (Runtime, HandReceiptMobile));
        }
    }
}

#[no_mangle]
pub extern "C" fn scan_qr(ptr: *mut c_void, data: *const c_char) -> *const c_char {
    let result = unsafe {
        let (runtime, core) = &*(ptr as *mut (Runtime, HandReceiptMobile));
        let data = CStr::from_ptr(data).to_string_lossy();
        
        runtime.block_on(async {
            core.scan_qr().await
        })
    };

    match result {
        Ok(scan_result) => {
            match serde_json::to_string(&scan_result) {
                Ok(json) => {
                    match CString::new(json) {
                        Ok(c_str) => c_str.into_raw(),
                        Err(_) => std::ptr::null(),
                    }
                }
                Err(_) => std::ptr::null(),
            }
        }
        Err(_) => std::ptr::null(),
    }
}

#[no_mangle]
pub extern "C" fn process_image_data(
    ptr: *mut c_void,
    data: *const u8,
    width: i32,
    height: i32,
) -> *const c_char {
    if ptr.is_null() || data.is_null() || width <= 0 || height <= 0 {
        return std::ptr::null();
    }

    unsafe {
        let (runtime, core) = &*(ptr as *mut (Runtime, HandReceiptMobile));
        let data_slice = std::slice::from_raw_parts(data, (width * height) as usize);
        
        // Convert raw data to GrayImage
        let img = match GrayImage::from_raw(width as u32, height as u32, data_slice.to_vec()) {
            Some(img) => img,
            None => return std::ptr::null(),
        };

        // Process image through QR scanner
        let result = runtime.block_on(async {
            core.scanner.process_image(&img).await
        });

        match result {
            Ok(Some(scan_result)) => {
                match serde_json::to_string(&scan_result) {
                    Ok(json) => {
                        match CString::new(json) {
                            Ok(c_str) => c_str.into_raw(),
                            Err(_) => std::ptr::null(),
                        }
                    }
                    Err(_) => std::ptr::null(),
                }
            }
            _ => std::ptr::null(),
        }
    }
}

#[no_mangle]
pub extern "C" fn verify_transfer(ptr: *mut c_void, scan_data: *const c_char) -> bool {
    let result = unsafe {
        let (runtime, core) = &*(ptr as *mut (Runtime, HandReceiptMobile));
        let data = CStr::from_ptr(scan_data).to_string_lossy();
        
        runtime.block_on(async {
            match serde_json::from_str::<QRScanResult>(&data) {
                Ok(scan_result) => core.verify_transfer(scan_result).await,
                Err(_) => Ok(false),
            }
        })
    };

    match result {
        Ok(valid) => valid,
        Err(_) => false,
    }
}

#[no_mangle]
pub extern "C" fn sync_pending_transfers(ptr: *mut c_void) {
    unsafe {
        let (runtime, core) = &*(ptr as *mut (Runtime, HandReceiptMobile));
        runtime.block_on(async {
            let _ = core.sync_pending_transfers().await;
        });
    }
}

// Helper function to free strings created by Rust
#[no_mangle]
pub extern "C" fn free_rust_string(s: *mut c_char) {
    unsafe {
        if !s.is_null() {
            let _ = CString::from_raw(s);
        }
    }
} 