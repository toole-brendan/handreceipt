/* Navigation.tsx */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  Search,
  Menu,
  Shield
} from 'lucide-react';
import type { RootState } from '@/store/store';
import '@/ui/styles/components/navigation.css';

interface UserState {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  classification: string;
  permissions: string[];
}

const Navigation: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user) as UserState;
  const unreadNotifications = useSelector((state: RootState) => 
    (state as any).notifications?.unread || 0
  );

  return (
    <nav className="navigation">
      <div className="navigation__title">
        <Link to="/" className="navigation__logo">
          <Shield size={24} />
          <span>MATS</span>
        </Link>
      </div>

      <div className="navigation__controls">
        <div className="navigation__search">
          <Search 
            size={16} 
            className="navigation__search-icon"
          />
          <input
            type="text"
            className="navigation__search-input"
            placeholder="Search..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>

        <div className="navigation__notification">
          <Link to="/notifications" aria-label="Notifications">
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="badge">{unreadNotifications}</span>
            )}
          </Link>
        </div>

        <div className="navigation__profile">
          <div className="navigation__profile-avatar">
            {user?.avatar || user?.name?.[0] || 'U'}
          </div>
          <div className="navigation__profile-info">
            <span className="navigation__profile-name">
              {user?.name || 'User'}
            </span>
            <span className="navigation__profile-role">
              {user?.role || 'Guest'}
            </span>
          </div>
        </div>

        <button 
          className="navigation__menu-button"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
