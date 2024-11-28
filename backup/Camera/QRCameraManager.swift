import AVFoundation
import UIKit

@objc(QRCameraManager)
class QRCameraManager: NSObject {
    private var captureSession: AVCaptureSession?
    private var videoPreviewLayer: AVCaptureVideoPreviewLayer?
    private var currentCameraInput: AVCaptureDeviceInput?
    private var metadataOutput: AVCaptureMetadataOutput?
    private var videoDataOutput: AVCaptureVideoDataOutput?
    private let sessionQueue = DispatchQueue(label: "com.handreceipt.camera.session")
    private var isProcessing = false
    
    override init() {
        super.init()
        setupCaptureSession()
    }
    
    private func setupCaptureSession() {
        captureSession = AVCaptureSession()
        captureSession?.sessionPreset = .high
        
        guard let backCamera = AVCaptureDevice.default(.builtInWideAngleCamera,
                                                      for: .video,
                                                      position: .back) else {
            print("Unable to access back camera")
            return
        }
        
        do {
            let input = try AVCaptureDeviceInput(device: backCamera)
            currentCameraInput = input
            
            if captureSession?.canAddInput(input) == true {
                captureSession?.addInput(input)
            }
            
            // Setup metadata output for QR codes
            metadataOutput = AVCaptureMetadataOutput()
            if captureSession?.canAddOutput(metadataOutput!) == true {
                captureSession?.addOutput(metadataOutput!)
                metadataOutput?.metadataObjectTypes = [.qr]
            }
            
            // Setup video output for frame processing
            videoDataOutput = AVCaptureVideoDataOutput()
            videoDataOutput?.videoSettings = [
                kCVPixelBufferPixelFormatTypeKey as String: Int(kCVPixelFormatType_32BGRA)
            ]
            videoDataOutput?.setSampleBufferDelegate(self, queue: sessionQueue)
            
            if captureSession?.canAddOutput(videoDataOutput!) == true {
                captureSession?.addOutput(videoDataOutput!)
            }
            
        } catch {
            print("Error setting up camera: \(error.localizedDescription)")
        }
    }
    
    @objc func startCamera(_ resolve: @escaping RCTPromiseResolveBlock,
                          reject: @escaping RCTPromiseRejectBlock) {
        checkCameraPermissions { [weak self] granted in
            guard granted else {
                reject("PERMISSION_ERROR", "Camera permission not granted", nil)
                return
            }
            
            self?.sessionQueue.async {
                self?.captureSession?.startRunning()
                resolve(nil)
            }
        }
    }
    
    @objc func stopCamera(_ resolve: @escaping RCTPromiseResolveBlock,
                         reject: @escaping RCTPromiseRejectBlock) {
        sessionQueue.async { [weak self] in
            self?.captureSession?.stopRunning()
            resolve(nil)
        }
    }
    
    private func checkCameraPermissions(completion: @escaping (Bool) -> Void) {
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized:
            completion(true)
        case .notDetermined:
            AVCaptureDevice.requestAccess(for: .video) { granted in
                DispatchQueue.main.async {
                    completion(granted)
                }
            }
        default:
            completion(false)
        }
    }
}

// MARK: - AVCaptureVideoDataOutputSampleBufferDelegate
extension QRCameraManager: AVCaptureVideoDataOutputSampleBufferDelegate {
    func captureOutput(_ output: AVCaptureOutput,
                      didOutput sampleBuffer: CMSampleBuffer,
                      from connection: AVCaptureConnection) {
        guard !isProcessing,
              let imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
            return
        }
        
        isProcessing = true
        
        CVPixelBufferLockBaseAddress(imageBuffer, .readOnly)
        defer {
            CVPixelBufferUnlockBaseAddress(imageBuffer, .readOnly)
            isProcessing = false
        }
        
        let width = CVPixelBufferGetWidth(imageBuffer)
        let height = CVPixelBufferGetHeight(imageBuffer)
        let baseAddress = CVPixelBufferGetBaseAddress(imageBuffer)
        let bytesPerRow = CVPixelBufferGetBytesPerRow(imageBuffer)
        
        // Create grayscale image for QR processing
        var grayBuffer = [UInt8](repeating: 0, count: width * height)
        let rgbaBuffer = baseAddress?.assumingMemoryBound(to: UInt8.self)
        
        for y in 0..<height {
            for x in 0..<width {
                let rgbaOffset = y * bytesPerRow + x * 4
                let gray = UInt8(
                    (Int(rgbaBuffer?[rgbaOffset + 0] ?? 0) +
                     Int(rgbaBuffer?[rgbaOffset + 1] ?? 0) +
                     Int(rgbaBuffer?[rgbaOffset + 2] ?? 0)) / 3
                )
                grayBuffer[y * width + x] = gray
            }
        }
        
        // Send grayscale image to Rust core for processing
        // This would be implemented based on your specific needs
    }
}

// MARK: - AVCaptureMetadataOutputObjectsDelegate
extension QRCameraManager: AVCaptureMetadataOutputObjectsDelegate {
    func metadataOutput(_ output: AVCaptureMetadataOutput,
                       didOutput metadataObjects: [AVMetadataObject],
                       from connection: AVCaptureConnection) {
        if let metadataObject = metadataObjects.first as? AVMetadataMachineReadableCodeObject,
           let stringValue = metadataObject.stringValue {
            // Handle QR code detection
            // This would be implemented based on your specific needs
        }
    }
} 