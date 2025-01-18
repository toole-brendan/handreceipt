import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Printer } from 'lucide-react';
import { GeneratedQR } from '../../types/qr.types';

interface QRPreviewProps {
  codes: GeneratedQR[];
  onDownload: (code: GeneratedQR) => void;
  onPrint: (code: GeneratedQR) => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({
  codes,
  onDownload,
  onPrint,
}) => {
  return (
    <div className="qr-preview">
      <div className="qr-grid">
        {codes.map((code) => (
          <div key={code.id} className="qr-item">
            <QRCodeSVG
              value={code.data}
              size={150}
              level="H"
              includeMargin
            />
            <div className="qr-item-info">
              <span className="qr-item-name">{code.itemName}</span>
              <span className="qr-item-serial">SN: {code.serialNumber}</span>
            </div>
            <div className="qr-item-actions">
              <button
                className="icon-button"
                onClick={() => onDownload(code)}
                title="Download QR Code"
              >
                <Download size={16} />
              </button>
              <button
                className="icon-button"
                onClick={() => onPrint(code)}
                title="Print QR Code"
              >
                <Printer size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 