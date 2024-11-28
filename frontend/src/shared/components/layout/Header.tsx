import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSettings } from '@contexts/SettingsContext';
import '@styles/components/header.css';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { preferences } = useSettings();

  const currentUser = {
    name: "John Smith",
    rank: "CPT",
    role: "Company Commander"
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          <span className="header-logo">Hand Receipt</span>
        </Link>
      </div>

      <div className="header__center">
        <div className="header__search">
          <input
            type="text"
            placeholder="Search..."
            className="header__search-input"
          />
        </div>
      </div>

      <div className="header__right">
        <button className="header__notification-btn">
          <i className="material-icons">notifications</i>
          <span className="header__notification-badge">3</span>
        </button>

        <div className="header__profile" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="header__profile-btn"
          >
            <div className="header__rank-insignia">
              <img
                src={`/ranks/${currentUser.rank.toLowerCase()}.png`}
                alt={`${currentUser.rank} Insignia`}
                className="rank-image"
              />
            </div>
            <div className="header__user-info">
              <span className="header__username">{`${currentUser.rank} ${currentUser.name}`}</span>
              <span className="header__user-role">{currentUser.role}</span>
            </div>
            <i className="material-icons">
              {isDropdownOpen ? 'expand_less' : 'expand_more'}
            </i>
          </button>

          {isDropdownOpen && (
            <div className="header__profile-menu">
              <Link to="/profile" className="header__menu-item">
                <i className="material-icons">account_circle</i>
                Profile
              </Link>
              <Link to="/profile/settings" className="header__menu-item">
                <i className="material-icons">settings</i>
                Settings
              </Link>
              <div className="header__menu-divider"></div>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate('/login');
                }}
                className="header__menu-item header__menu-item--danger"
              >
                <i className="material-icons">logout</i>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 