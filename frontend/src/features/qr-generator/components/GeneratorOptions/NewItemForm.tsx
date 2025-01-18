import React from 'react';
import { NewItemFormData } from '../../types/qr.types';

interface NewItemFormProps {
  formData: NewItemFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const NewItemForm: React.FC<NewItemFormProps> = ({ formData, onChange }) => {
  return (
    <div className="generation-interface new-item-mode">
      <form className="new-item-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Enter item name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="serialNumber">Serial Number</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={onChange}
              placeholder="Enter serial number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={onChange}
            >
              <option value="">Select category</option>
              <option value="weapons">Weapons</option>
              <option value="protection">Protection</option>
              <option value="equipment">Equipment</option>
              <option value="optics">Optics</option>
              <option value="communications">Communications</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Initial Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={onChange}
              placeholder="Enter initial location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="value">Value</label>
            <input
              type="text"
              id="value"
              name="value"
              value={formData.value}
              onChange={onChange}
              placeholder="Enter value"
            />
          </div>

          <div className="form-group">
            <label htmlFor="condition">Condition</label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={onChange}
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={onChange}
              placeholder="Enter any additional notes or details"
            />
          </div>

          <div className="form-group full-width sensitive-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isSensitive"
                checked={formData.isSensitive}
                onChange={onChange}
              />
              <span>Mark as sensitive item</span>
            </label>
            {formData.isSensitive && (
              <p className="warning-text">Additional verification will be required for sensitive items</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}; 