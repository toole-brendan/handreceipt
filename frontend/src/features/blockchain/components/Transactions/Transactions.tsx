/* frontend/src/pages/blockchain/transactions.tsx */

import React, { useState, useEffect } from 'react';
import '@/styles/components/blockchain/transactions.css';
import LoadingFallback from '@/shared/components/components/common/LoadingFallback';
import { PropertyTransaction, fetchPropertyTransactions, exportPropertyTransactions, TransactionError } from '@/services/transactions';

const ITEMS_PER_PAGE = 10;

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<PropertyTransaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPropertyTransactions();
        setTransactions(response.data);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error('Error loading transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const handleExport = async () => {
    try {
      const blob = await exportPropertyTransactions('csv');
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `property-transactions-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      tx.fromSoldier.name.toLowerCase().includes(searchLower) ||
      tx.toSoldier.name.toLowerCase().includes(searchLower) ||
      tx.propertyItem.name.toLowerCase().includes(searchLower) ||
      tx.propertyItem.serialNumber.toLowerCase().includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  // Pagination calculation
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <div className="secure-container">
      <div className="palantir-panel transactions-page">
        <div className="transactions-header">
          <h2>Property Transactions</h2>
          <button 
            className="btn btn-secondary" 
            onClick={handleExport}
            disabled={isLoading || transactions.length === 0}
          >
            Export Transactions
          </button>
        </div>

        <div className="transactions-filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input search-input"
              aria-label="Search transactions"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-input"
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Item</th>
                <th>Serial Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6}>No transactions found.</td>
                </tr>
              ) : (
                currentTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{new Date(tx.timestamp).toLocaleDateString()}</td>
                    <td>{`${tx.fromSoldier.rank} ${tx.fromSoldier.name}`}<br/>
                        <small>{tx.fromSoldier.unit}</small>
                    </td>
                    <td>{`${tx.toSoldier.rank} ${tx.toSoldier.name}`}<br/>
                        <small>{tx.toSoldier.unit}</small>
                    </td>
                    <td>{tx.propertyItem.name}</td>
                    <td>{tx.propertyItem.serialNumber}</td>
                    <td className={`status ${tx.status}`}>{tx.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add pagination controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm"
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;