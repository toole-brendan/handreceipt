import React, { useState, useEffect } from 'react';
import '@/ui/styles/pages/admin.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  clearance: string;
  status: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Replace with your API call
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = (userId: number, newRole: string) => {
    // Update user role
    console.log(`User ID: ${userId}, New Role: ${newRole}`);
  };

  const handleStatusChange = (userId: number, newStatus: string) => {
    // Update user account status
    console.log(`User ID: ${userId}, New Status: ${newStatus}`);
  };

  if (loading) {
    return (
      <div className="palantir-panel user-management">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="palantir-panel user-management">
      <div className="admin-header">
        <h2>User Management</h2>
        <button className="btn btn-primary">Add New User</button>
      </div>

      <div className="search-bar">
        <input type="text" className="search-input" placeholder="Search users..." />
        <button className="btn btn-secondary">Search</button>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Clearance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Manager">Manager</option>
                  </select>
                </td>
                <td>
                  <select
                    value={user.clearance}
                    onChange={(e) => console.log('Clearance changed')}
                  >
                    <option value="Unclassified">Unclassified</option>
                    <option value="Confidential">Confidential</option>
                    <option value="Secret">Secret</option>
                    <option value="Top Secret">Top Secret</option>
                  </select>
                </td>
                <td>
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Deactivated">Deactivated</option>
                  </select>
                </td>
                <td>
                  <button className="btn-icon">View</button>
                  <button className="btn-icon">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;