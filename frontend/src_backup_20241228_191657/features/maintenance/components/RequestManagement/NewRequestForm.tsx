import React, { useState } from 'react';
import { RequestFormData } from '../../types/maintenance.types';

interface NewRequestFormProps {
  onSubmit: (data: RequestFormData) => void;
  onCancel: () => void;
}

export const NewRequestForm: React.FC<NewRequestFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<RequestFormData>({
    itemId: '',
    requestType: 'repair',
    priority: 'medium',
    description: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="new-request-form">
      <div className="form-group">
        <label htmlFor="itemId">Item ID</label>
        <input
          type="text"
          id="itemId"
          name="itemId"
          value={formData.itemId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="requestType">Request Type</label>
        <select
          id="requestType"
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          required
        >
          <option value="repair">Repair</option>
          <option value="inspection">Inspection</option>
          <option value="replacement">Replacement</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Additional Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </div>
    </form>
  );
}; 