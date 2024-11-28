import React from 'react';
import '@/ui/styles/components/dashboard/transfer-requests.css';

interface TransferRequest {
  id: string;
  requestedBy: {
    name: string;
    rank: string;
    unit: string;
  };
  item: {
    name: string;
    serialNumber: string;
    category: string;
  };
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

const mockTransferRequests: TransferRequest[] = [
  {
    id: '1',
    requestedBy: {
      name: 'Martinez, Carlos',
      rank: 'SPC',
      unit: '2nd PLT'
    },
    item: {
      name: 'M4 Carbine',
      serialNumber: 'M4-789012',
      category: 'Weapon'
    },
    requestDate: '2024-03-26T09:30:00Z',
    status: 'pending',
    reason: 'Unit transfer'
  },
  {
    id: '2',
    requestedBy: {
      name: 'Johnson, Sarah',
      rank: 'SGT',
      unit: '1st PLT'
    },
    item: {
      name: 'PVS-14',
      serialNumber: 'NV-345678',
      category: 'Optics'
    },
    requestDate: '2024-03-26T08:45:00Z',
    status: 'pending',
    reason: 'Training requirement'
  },
  {
    id: '3',
    requestedBy: {
      name: 'Thompson, Mike',
      rank: 'SSG',
      unit: 'HQ PLT'
    },
    item: {
      name: 'ACOG Sight',
      serialNumber: 'ACOG-123456',
      category: 'Optics'
    },
    requestDate: '2024-03-25T15:20:00Z',
    status: 'pending',
    reason: 'Range qualification'
  }
];

const TransferRequests: React.FC = () => {
  return (
    <div className="transfer-requests">
      <div className="transfer-requests__header">
        <h3>Transfer Requests</h3>
        <span className="transfer-requests__count">
          {mockTransferRequests.length} Pending
        </span>
      </div>

      <div className="transfer-requests__content">
        {mockTransferRequests.length === 0 ? (
          <p className="no-requests">No pending transfer requests</p>
        ) : (
          <div className="requests-list">
            {mockTransferRequests.map((request) => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <span className="requester">
                    {request.requestedBy.rank} {request.requestedBy.name}
                  </span>
                  <span className="request-date">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="request-details">
                  <p className="item-info">
                    <strong>{request.item.name}</strong>
                    <span className="serial">SN: {request.item.serialNumber}</span>
                  </p>
                  <p className="reason">{request.reason}</p>
                </div>
                <div className="request-actions">
                  <button className="btn-approve">Approve</button>
                  <button className="btn-reject">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferRequests;
