import Foundation
import React
import Security
import CommonCrypto

@objc(HandReceiptModule)
class HandReceiptModule: NSObject {
    private let queue = DispatchQueue(label: "com.handreceipt.core", qos: .userInitiated)
    private let keyTag = "com.handreceipt.keypair".data(using: .utf8)!
    private let defaults = UserDefaults.standard
    
    override init() {
        super.init()
        generateOrGetKeyPair()
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    private func generateOrGetKeyPair() {
        let query: [String: Any] = [
            kSecClass as String: kSecClassKey,
            kSecAttrKeyType as String: kSecAttrKeyTypeRSA,
            kSecAttrKeySizeInBits as String: 2048,
            kSecPrivateKeyAttrs as String: [
                kSecAttrIsPermanent as String: true,
                kSecAttrApplicationTag as String: keyTag
            ]
        ]
        
        var error: Unmanaged<CFError>?
        let access = SecAccessControlCreateWithFlags(
            kCFAllocatorDefault,
            kSecAttrAccessibleAfterFirstUnlock,
            .privateKeyUsage,
            &error
        )
        
        if SecKeyCreateRandomKey(query as CFDictionary, &error) == nil {
            print("Error generating key pair: \(error.debugDescription)")
        }
    }
    
    private func getPrivateKey() -> SecKey? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassKey,
            kSecAttrKeyType as String: kSecAttrKeyTypeRSA,
            kSecAttrApplicationTag as String: keyTag,
            kSecReturnRef as String: true
        ]
        
        var item: CFTypeRef?
        let status = SecItemCopyMatching(query as CFDictionary, &item)
        guard status == errSecSuccess else { return nil }
        return (item as! SecKey)
    }
    
    private func getPublicKey(privateKey: SecKey) -> SecKey? {
        return SecKeyCopyPublicKey(privateKey)
    }
    
    private func sign(data: Data, privateKey: SecKey) -> Data? {
        var error: Unmanaged<CFError>?
        guard let signature = SecKeyCreateSignature(
            privateKey,
            .rsaSignatureMessagePKCS1v15SHA256,
            data as CFData,
            &error
        ) as Data? else {
            print("Signing error: \(error.debugDescription)")
            return nil
        }
        return signature
    }
    
    private func verify(data: Data, signature: Data, publicKey: SecKey) -> Bool {
        var error: Unmanaged<CFError>?
        let result = SecKeyVerifySignature(
            publicKey,
            .rsaSignatureMessagePKCS1v15SHA256,
            data as CFData,
            signature as CFData,
            &error
        )
        if let error = error {
            print("Verification error: \(error.takeRetainedValue())")
        }
        return result
    }
    
    @objc(readCAC:withRejecter:)
    func readCAC(_ resolve: @escaping RCTPromiseResolveBlock,
                 withRejecter reject: @escaping RCTPromiseRejectBlock) {
        queue.async {
            if let cacData = self.defaults.string(forKey: "cacData") {
                resolve(cacData)
            } else {
                reject("CAC_NOT_FOUND", "No CAC data found", nil)
            }
        }
    }
    
    @objc(scanQR:withResolver:withRejecter:)
    func scanQR(_ data: String,
                withResolver resolve: @escaping RCTPromiseResolveBlock,
                withRejecter reject: @escaping RCTPromiseRejectBlock) {
        queue.async {
            do {
                guard let jsonData = data.data(using: .utf8),
                      let qrJson = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any],
                      let propertyId = qrJson["propertyId"] as? String,
                      let signatureBase64 = qrJson["signature"] as? String,
                      let signatureData = Data(base64Encoded: signatureBase64),
                      let privateKey = self.getPrivateKey(),
                      let publicKey = self.getPublicKey(privateKey: privateKey) else {
                    throw NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid QR data"])
                }
                
                let propertyData = propertyId.data(using: .utf8)!
                guard self.verify(data: propertyData, signature: signatureData, publicKey: publicKey) else {
                    throw NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid signature"])
                }
                
                let result: [String: Any] = [
                    "transferId": UUID().uuidString,
                    "propertyId": propertyId,
                    "timestamp": Int64(Date().timeIntervalSince1970 * 1000),
                    "signature": signatureBase64
                ]
                
                let resultData = try JSONSerialization.data(withJSONObject: result)
                resolve(String(data: resultData, encoding: .utf8))
            } catch {
                reject("QR_SCAN_ERROR", error.localizedDescription, error)
            }
        }
    }
    
    @objc(generateQR:withResolver:withRejecter:)
    func generateQR(_ propertyId: String,
                   withResolver resolve: @escaping RCTPromiseResolveBlock,
                   withRejecter reject: @escaping RCTPromiseRejectBlock) {
        queue.async {
            do {
                guard let privateKey = self.getPrivateKey(),
                      let propertyData = propertyId.data(using: .utf8),
                      let signature = self.sign(data: propertyData, privateKey: privateKey) else {
                    throw NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "Signing failed"])
                }
                
                let result: [String: Any] = [
                    "propertyId": propertyId,
                    "signature": signature.base64EncodedString()
                ]
                
                let resultData = try JSONSerialization.data(withJSONObject: result)
                resolve(String(data: resultData, encoding: .utf8))
            } catch {
                reject("QR_GENERATION_ERROR", error.localizedDescription, error)
            }
        }
    }
    
    @objc(storeTransfer:withResolver:withRejecter:)
    func storeTransfer(_ transferJson: String,
                      withResolver resolve: @escaping RCTPromiseResolveBlock,
                      withRejecter reject: @escaping RCTPromiseRejectBlock) {
        queue.async {
            do {
                guard let jsonData = transferJson.data(using: .utf8),
                      let transfer = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any] else {
                    throw NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid transfer data"])
                }
                
                var pendingTransfers = self.getPendingTransfers()
                pendingTransfers.append(transfer)
                
                let pendingData = try JSONSerialization.data(withJSONObject: pendingTransfers)
                self.defaults.set(pendingData, forKey: "pendingTransfers")
                resolve(nil)
            } catch {
                reject("STORAGE_ERROR", error.localizedDescription, error)
            }
        }
    }
    
    @objc(submitTransfer:withResolver:withRejecter:)
    func submitTransfer(_ transferJson: String,
                       withResolver resolve: @escaping RCTPromiseResolveBlock,
                       withRejecter reject: @escaping RCTPromiseRejectBlock) {
        queue.async {
            do {
                guard let jsonData = transferJson.data(using: .utf8),
                      var transfer = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any],
                      let privateKey = self.getPrivateKey() else {
                    throw NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid transfer data"])
                }
                
                let transferData = try JSONSerialization.data(withJSONObject: transfer)
                guard let signature = self.sign(data: transferData, privateKey: privateKey) else {
                    throw NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "Signing failed"])
                }
                
                transfer["signature"] = signature.base64EncodedString()
                
                var completedTransfers = self.getCompletedTransfers()
                completedTransfers.append(transfer)
                
                let completedData = try JSONSerialization.data(withJSONObject: completedTransfers)
                self.defaults.set(completedData, forKey: "completedTransfers")
                
                resolve(["success": true])
            } catch {
                reject("SUBMIT_ERROR", error.localizedDescription, error)
            }
        }
    }
    
    @objc(getTransferHistory:withResolver:withRejecter:)
    func getTransferHistory(_ filtersJson: String,
                          withResolver resolve: @escaping RCTPromiseResolveBlock,
                          withRejecter reject: @escaping RCTPromiseRejectBlock) {
        queue.async {
            do {
                guard let jsonData = filtersJson.data(using: .utf8),
                      let filters = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any] else {
                    throw NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid filters"])
                }
                
                let completedTransfers = self.getCompletedTransfers()
                let filteredTransfers = completedTransfers.filter { transfer in
                    self.matchesFilters(transfer: transfer, filters: filters)
                }
                
                let resultData = try JSONSerialization.data(withJSONObject: filteredTransfers)
                resolve(String(data: resultData, encoding: .utf8))
            } catch {
                reject("HISTORY_ERROR", error.localizedDescription, error)
            }
        }
    }
    
    private func getPendingTransfers() -> [[String: Any]] {
        guard let data = defaults.data(forKey: "pendingTransfers"),
              let transfers = try? JSONSerialization.jsonObject(with: data) as? [[String: Any]] else {
            return []
        }
        return transfers
    }
    
    private func getCompletedTransfers() -> [[String: Any]] {
        guard let data = defaults.data(forKey: "completedTransfers"),
              let transfers = try? JSONSerialization.jsonObject(with: data) as? [[String: Any]] else {
            return []
        }
        return transfers
    }
    
    private func matchesFilters(transfer: [String: Any], filters: [String: Any]) -> Bool {
        if let propertyId = filters["propertyId"] as? String,
           propertyId != transfer["propertyId"] as? String {
            return false
        }
        
        if let userId = filters["userId"] as? String,
           userId != transfer["fromUserId"] as? String,
           userId != transfer["toUserId"] as? String {
            return false
        }
        
        return true
    }
} 