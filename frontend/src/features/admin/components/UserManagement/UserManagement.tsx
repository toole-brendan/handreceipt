// src/ui/components/admin/UserManagement.tsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { FiEdit2, FiUserPlus, FiUserX, FiX } from 'react-icons/fi';

interface User {
  id: string;
  militaryId: string;
  rank: string;
  name: string;
  email: string;
  role: string;
  clearanceLevel: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
}

interface UserFilters {
  role?: string;
  clearanceLevel?: string;
  status?: string;
}

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFilters>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { classificationLevel } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, classificationLevel]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters as Record<string, string>);
      const response = await fetch(`/api/admin/users?${queryParams}`, {
        headers: {
          'Classification-Level': classificationLevel,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: User['status']) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Classification-Level': classificationLevel,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      await fetchUsers();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update user');
    }
  };

  const handleClearanceChange = async (userId: string, newClearance: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/clearance`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Classification-Level': classificationLevel,
        },
        body: JSON.stringify({ clearanceLevel: newClearance }),
      });

      if (!response.ok) {
        throw new Error('Failed to update clearance level');
      }

      await fetchUsers();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update clearance');
    }
  };

  return (
    <div className="user-management" style={{ marginTop: '60px' }}>
      <header className="admin-header">
        <h2>User Management</h2>
        <button className="btn-primary" onClick={() => setSelectedUser(null)}>
          <FiUserPlus /> Add New User
        </button>
      </header>

      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={filters.role || ''}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="operator">Operator</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="clearanceLevel">Clearance Level</label>
          <select
            id="clearanceLevel"
            value={filters.clearanceLevel || ''}
            onChange={(e) =>
              setFilters({ ...filters, clearanceLevel: e.target.value })
            }
          >
            <option value="">All Levels</option>
            <option value="TOP_SECRET">TOP SECRET</option>
            <option value="SECRET">SECRET</option>
            <option value="CONFIDENTIAL">CONFIDENTIAL</option>
            <option value="UNCLASSIFIED">UNCLASSIFIED</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <div className="users-table-container">
          <div className="table-responsive">
            <table className="data-table users-table">
              <thead>
                <tr>
                  <th>Military ID</th>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Clearance Level</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.militaryId}</td>
                    <td>{user.rank}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>
                      <select
                        value={user.clearanceLevel}
                        onChange={(e) => handleClearanceChange(user.id, e.target.value)}
                      >
                        <option value="TOP_SECRET">TOP SECRET</option>
                        <option value="SECRET">SECRET</option>
                        <option value="CONFIDENTIAL">CONFIDENTIAL</option>
                        <option value="UNCLASSIFIED">UNCLASSIFIED</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={user.status}
                        onChange={(e) =>
                          handleStatusChange(user.id, e.target.value as User['status'])
                        }
                        className={`status-${user.status}`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </td>
                    <td>{new Date(user.lastLogin).toLocaleString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => setSelectedUser(user)}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => handleStatusChange(user.id, 'suspended')}
                          title="Suspend"
                        >
                          <FiUserX />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Edit Modal - Placeholder for when selectedUser is set */}
      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header className="modal-header">
              <h3>Edit User</h3>
              <button
                className="btn-close"
                onClick={() => setSelectedUser(null)}
                aria-label="Close Modal"
              >
                <FiX />
              </button>
            </header>

            <div className="modal-body">
              <div className="form-scroll-container">
                {/* User edit form fields go here */}
                <p>Editing user: {selectedUser.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
