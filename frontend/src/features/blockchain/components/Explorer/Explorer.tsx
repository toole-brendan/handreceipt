// frontend/src/pages/blockchain/explorer.tsx

import React, { useState } from 'react';
import '@styles/pages/blockchain/explorer.css';

interface Block {
  id: string;
  hash: string;
  timestamp: string;
  transactions: PropertyTransaction[];
  size: number;
  verifiedBy: string[];
}

interface PropertyTransaction {
  id: string;
  hash: string;
  type: 'transfer' | 'inventory' | 'maintenance';
  fromUnit: string;
  toUnit: string;
  items: string[];
  verifiedBy: string;
  timestamp: string;
  status: 'verified' | 'pending' | 'rejected';
}

const BlockchainExplorer: React.FC = () => {
  // Mock data for military property transactions
  const mockBlocks: Block[] = [
    {
      id: '1024',
      hash: '0x7f4e9a2c8b1d3f6e',
      timestamp: '2024-03-26T14:30:00Z',
      size: 1420,
      verifiedBy: ['CPT Johnson', 'SFC Williams'],
      transactions: [
        {
          id: 'TX001',
          hash: '0x1a2b3c4d',
          type: 'transfer',
          fromUnit: '1st Platoon, Alpha Company',
          toUnit: '2nd Platoon, Bravo Company',
          items: ['M4 Carbine #AF20145', 'PVS-14 #NV5123'],
          verifiedBy: 'CPT Johnson',
          timestamp: '2024-03-26T14:25:00Z',
          status: 'verified'
        }
      ]
    },
    {
      id: '1023',
      hash: '0x9e8d7c6b5a4f3e2d',
      timestamp: '2024-03-26T14:00:00Z',
      size: 2150,
      verifiedBy: ['1LT Smith', 'SSG Brown'],
      transactions: [
        {
          id: 'TX002',
          hash: '0x2b3c4d5e',
          type: 'inventory',
          fromUnit: 'HHC Property Room',
          toUnit: 'HHC Property Room',
          items: ['Sensitive Items Inventory - March 26'],
          verifiedBy: '1LT Smith',
          timestamp: '2024-03-26T13:55:00Z',
          status: 'verified'
        }
      ]
    }
  ];

  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Property Transaction Ledger</h1>
        <div className="dashboard-description">
          Secure, immutable record of all property transactions
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Search Section */}
        <section className="dashboard__section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by transaction ID, hash, or unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </section>

        {/* Blocks Overview */}
        <section className="dashboard__section">
          <h2>Recent Transactions</h2>
          <div className="status-cards">
            {mockBlocks.map(block => (
              <div key={block.id} className="status-card" onClick={() => setSelectedBlock(block)}>
                <div className="status-card__header">
                  <h3>Block #{block.id}</h3>
                  <div className="status-badge status-badge--info">
                    {block.transactions.length} Transaction{block.transactions.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="status-card__content">
                  <div className="detail-row">
                    <span className="detail-label">Hash:</span>
                    <span className="detail-value">{block.hash}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Timestamp:</span>
                    <span className="detail-value">
                      {new Date(block.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Verified By:</span>
                    <span className="detail-value">{block.verifiedBy.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Transaction Details Modal */}
        {selectedBlock && (
          <div className="modal-overlay" onClick={() => setSelectedBlock(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Block #{selectedBlock.id} Details</h3>
                <button 
                  className="close-button"
                  onClick={() => setSelectedBlock(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="block-details">
                  <div className="detail-group">
                    <h4>Block Information</h4>
                    <div className="detail-row">
                      <span className="detail-label">Hash:</span>
                      <span className="detail-value">{selectedBlock.hash}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Timestamp:</span>
                      <span className="detail-value">
                        {new Date(selectedBlock.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Size:</span>
                      <span className="detail-value">{selectedBlock.size} bytes</span>
                    </div>
                  </div>

                  <div className="detail-group">
                    <h4>Transactions</h4>
                    {selectedBlock.transactions.map(tx => (
                      <div key={tx.id} className="transaction-card">
                        <div className="transaction-header">
                          <span className="transaction-id">ID: {tx.id}</span>
                          <span className={`status-badge status-badge--${tx.status}`}>
                            {tx.status}
                          </span>
                        </div>
                        <div className="transaction-details">
                          <div className="detail-row">
                            <span className="detail-label">Type:</span>
                            <span className="detail-value">{tx.type}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">From:</span>
                            <span className="detail-value">{tx.fromUnit}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">To:</span>
                            <span className="detail-value">{tx.toUnit}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Items:</span>
                            <span className="detail-value">{tx.items.join(', ')}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Verified By:</span>
                            <span className="detail-value">{tx.verifiedBy}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainExplorer;
