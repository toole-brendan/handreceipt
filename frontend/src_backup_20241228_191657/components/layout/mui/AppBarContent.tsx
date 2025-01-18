import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Box,
  styled,
  Theme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { RootState } from '@/store/store';
import { CustomTheme } from '../../../styles/theme';
import {
  OFFICER_SEARCH_SCOPE,
  NCO_SEARCH_SCOPE,
  SOLDIER_SEARCH_SCOPE,
} from '@/shared/types/navigation';

interface UserState {
  id: string;
  name: string;
  rank: string;
  role: 'officer' | 'nco' | 'soldier';
  classification: string;
  permissions: string[];
}

interface AppBarContentProps {}

const Search = styled('div')(({ theme }) => {
  const customTheme = theme as CustomTheme;
  
  return {
    position: 'relative',
    borderRadius: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: '100%',
    maxWidth: '600px',
    transition: theme.transitions.create(
      ['background-color', 'border-color', 'box-shadow'],
      {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut,
      }
    ),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  };
});

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255, 255, 255, 0.7)',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#FFFFFF',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
  },
}));

const UserInfo = styled(Box)(({ theme }) => {
  const customTheme = theme as CustomTheme;
  
  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0.5, 1),
    cursor: 'pointer',
    borderRadius: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: theme.transitions.create(
      ['background-color', 'transform', 'box-shadow'],
      {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut,
      }
    ),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    },
  };
});

const StyledMenu = styled(Menu)(({ theme }) => {
  const customTheme = theme as CustomTheme;
  
  return {
    '& .MuiPaper-root': {
      backgroundColor: '#000000',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 0,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      '& .MuiMenuItem-root': {
        transition: theme.transitions.create(
          ['background-color', 'color'],
          {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut,
          }
        ),
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
  };
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#FF3B3B',
    color: '#FFFFFF',
    boxShadow: '0 0 0 2px #000000',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const LogoContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1, 0, 2),
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9,
  },
}));

const LogoBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  border: '1px solid rgba(255, 255, 255, 0.7)',
  padding: theme.spacing(0.75, 2),
  marginRight: theme.spacing(2),
  '& h1': {
    fontSize: '1.125rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: '#FFFFFF',
    margin: 0,
    fontFamily: 'Georgia, serif',
    textTransform: 'none',
  },
}));

export const AppBarContent: React.FC<AppBarContentProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.user as UserState | null;

  const getSearchScope = () => {
    if (!user?.role) return SOLDIER_SEARCH_SCOPE;
    
    switch (user.role) {
      case 'officer':
        return OFFICER_SEARCH_SCOPE;
      case 'nco':
        return NCO_SEARCH_SCOPE;
      case 'soldier':
        return SOLDIER_SEARCH_SCOPE;
      default:
        return SOLDIER_SEARCH_SCOPE;
    }
  };

  const getSearchPlaceholder = () => {
    const scope = getSearchScope();
    const searchTypes = [
      scope.property && 'property',
      scope.serialNumbers && 'serial numbers',
      scope.personnel && 'personnel',
      scope.documents && 'documents',
    ].filter(Boolean).join(', ');
    
    return `Search ${searchTypes}...`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    // TODO: Implement logout functionality
    navigate('/login');
  };

  const handleLogoClick = () => {
    if (!user?.role) {
      navigate('/login');
      return;
    }
    
    switch (user.role) {
      case 'officer':
        navigate('/officer/dashboard');
        break;
      case 'nco':
        navigate('/nco/dashboard');
        break;
      case 'soldier':
        navigate('/soldier/dashboard');
        break;
      default:
        navigate('/login');
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getUserDisplayName = () => {
    if (!user?.rank || !user?.name) return 'User';
    return `${user.rank} ${user.name}`;
  };

  const getUserRole = () => {
    return user?.role || 'Guest';
  };

  return (
    <Toolbar>
      <LogoContainer onClick={handleLogoClick}>
        <LogoBox>
          <h1>HandReceipt</h1>
        </LogoBox>
      </LogoContainer>

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
          <StyledInputBase
            placeholder={getSearchPlaceholder()}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </form>
      </Search>

      <Box sx={{ flexGrow: 1 }} />

      <IconButton
        size="large"
        aria-label="show notifications"
        color="inherit"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        <StyledBadge badgeContent={3} color="error">
          <NotificationsIcon />
        </StyledBadge>
      </IconButton>

      <UserInfo onClick={handleMenuOpen}>
        <Avatar
          src={user?.rank ? `/ranks/${user.rank.toLowerCase()}.png` : undefined}
          alt={user?.rank ? `${user.rank} Insignia` : 'User Avatar'}
          sx={{
            width: 32,
            height: 32,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          {!user?.rank && 'U'}
        </Avatar>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            {getUserDisplayName()}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.7rem',
            }}
          >
            {getUserRole()}
          </Typography>
        </Box>
        <ArrowDownIcon
          sx={{
            fontSize: 20,
            color: 'text.secondary',
            transition: (theme) =>
              theme.transitions.create('transform', {
                duration: theme.transitions.duration.shorter,
              }),
            transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'none',
          }}
        />
      </UserInfo>

      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to="/profile">
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/settings">
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </StyledMenu>
    </Toolbar>
  );
}; 