// src/ui/components/verification/AssetVerificationForm.tsx

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { FiX, FiUpload } from 'react-icons/fi';

interface VerificationFormProps {
  assetId: string;
  onComplete: () => void;
  onCancel: () => void;
}

interface VerificationData {
  physicalCheck: boolean;
  serialNumberMatch: boolean;
  locationConfirmed: boolean;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  notes: string;
  images: File[];
}

interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
}

export const AssetVerificationForm: React.FC<VerificationFormProps> = ({
  assetId,
  onComplete,
  onCancel,
}) => {
  const { classificationLevel } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationData, setVerificationData] = useState<VerificationData>({
    physicalCheck: false,
    serialNumberMatch: false,
    locationConfirmed: false,
    condition: 'good',
    notes: '',
    images: [],
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', label: 'Asset physically present', required: true, checked: false },
    { id: '2', label: 'Serial number matches record', required: true, checked: false },
    { id: '3', label: 'Location matches record', required: true, checked: false },
    { id: '4', label: 'No visible damage', required: false, checked: false },
    { id: '5', label: 'Security seals intact', required: true, checked: false },
  ]);

  const handleChecklistChange = (itemId: string, checked: boolean) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, checked } : item))
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setVerificationData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }));
    }
  };

  const removeImage = (index: number) => {
    setVerificationData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requiredItemsChecked = checklist
      .filter((item) => item.required)
      .every((item) => item.checked);

    if (!requiredItemsChecked) {
      setError('Please complete all required checklist items');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        'verificationData',
        JSON.stringify({
          ...verificationData,
          checklist,
        })
      );
      verificationData.images.forEach((image, index) => {
        formData.append(`image-${index}`, image);
      });

      const response = await fetch(`/api/assets/${assetId}/verify`, {
        method: 'POST',
        headers: {
          'Classification-Level': classificationLevel,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Verification submission failed');
      }

      onComplete();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to submit verification'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verification-form">
      <header className="form-header">
        <h2>Asset Verification</h2>
        <div className="form-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Verification'}
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="form-content">
        <section className="checklist-section">
          <h3>Verification Checklist</h3>
          <div className="checklist-grid">
            {checklist.map((item) => (
              <div key={item.id} className="checklist-item">
                <label>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) =>
                      handleChecklistChange(item.id, e.target.checked)
                    }
                  />
                  {item.label}
                  {item.required && <span className="required">*</span>}
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="condition-section">
          <h3>Asset Condition</h3>
          <select
            value={verificationData.condition}
            onChange={(e) =>
              setVerificationData((prev) => ({
                ...prev,
                condition: e.target.value as VerificationData['condition'],
              }))
            }
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </section>

        <section className="images-section">
          <h3>Verification Images</h3>
          <div className="image-upload">
            <label className="upload-button">
              <FiUpload /> Upload Images
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
            <div className="image-preview">
              {verificationData.images.map((image, index) => (
                <div key={index} className="image-preview-item">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => removeImage(index)}
                    aria-label="Remove Image"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="notes-section">
          <h3>Notes</h3>
          <textarea
            value={verificationData.notes}
            onChange={(e) =>
              setVerificationData((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
            rows={4}
            placeholder="Enter any additional notes or observations..."
          />
        </section>

        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};
