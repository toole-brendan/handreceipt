/* frontend/src/pages/mobile/scanner.tsx */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import '@/styles/components/mobile/scanner.css';

const Scanner: React.FC = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState('');

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");

    const startScanner = async () => {
      try {
        setScanning(true);
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText) => {
            // Handle successful scan
            handleScanSuccess(decodedText);
          },
          (errorMessage) => {
            // Ignore continuous scanning errors
            console.log(errorMessage);
          }
        );
      } catch (err) {
        setError('Failed to start scanner. Please ensure camera permissions are granted.');
        console.error(err);
      }
    };

    startScanner();

    // Cleanup on unmount
    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => {
          console.error('Failed to stop scanner:', err);
        });
      }
    };
  }, []);

  const handleScanSuccess = async (decodedText: string) => {
    try {
      // Send the scanned data to your API
      const response = await fetch(`/api/assets/${decodedText}`);
      
      if (!response.ok) {
        throw new Error('Failed to verify asset');
      }

      const data = await response.json();
      // Navigate to asset detail page on success
      navigate(`/assets/${decodedText}`);

    } catch (err) {
      setError('Failed to verify asset');
      console.error('Verification error:', err);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      await handleScanSuccess(manualInput.trim());
    }
  };

  return (
    <div className="scanner-container">
      <div className="scanner-header">
        <h2>Asset Scanner</h2>
        {scanning && <span className="scanning-status">Scanning...</span>}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div id="reader" className="scanner-viewport"></div>

      <div className="manual-input-section">
        <h3>Manual Entry</h3>
        <form onSubmit={handleManualSubmit}>
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="Enter Asset ID"
            className="manual-input"
          />
          <button type="submit" className="submit-button">
            Lookup Asset
          </button>
        </form>
      </div>

      <div className="scanner-instructions">
        <p>Point camera at QR code to scan asset</p>
        <i className="material-icons">qr_code_scanner</i>
      </div>
    </div>
  );
};

export default Scanner;