import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { login, clearError } from '@/store/slices/auth/authSlice';
import { 
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link as MuiLink,
  IconButton,
  InputAdornment,
  Alert,
  useTheme,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Visibility, 
  VisibilityOff,
} from '@mui/icons-material';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(3),
  background: '#000000',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  border: '2px solid #FFFFFF',
  padding: theme.spacing(2, 4),
  marginBottom: theme.spacing(6),
}));

const LogoText = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  fontFamily: 'serif',
  fontSize: '2.5rem',
  fontWeight: 400,
  letterSpacing: '0.05em',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  padding: theme.spacing(4),
  backgroundColor: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    '& fieldset': {
      borderColor: alpha('#FFFFFF', 0.3),
    },
    '&:hover fieldset': {
      borderColor: alpha('#FFFFFF', 0.5),
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF',
    },
  },
  '& .MuiInputLabel-root': {
    color: alpha('#FFFFFF', 0.7),
  },
  '& .MuiInputBase-input': {
    color: '#FFFFFF',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  backgroundColor: '#1A1A1A',
  color: '#FFFFFF',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: '#2A2A2A',
  },
  '& .MuiButton-label': {
    textTransform: 'none',
    fontSize: '1rem',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    color: '#FFFFFF',
    '& fieldset': {
      borderColor: alpha('#FFFFFF', 0.3),
    },
    '&:hover fieldset': {
      borderColor: alpha('#FFFFFF', 0.5),
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF',
    },
  },
  '& .MuiInputLabel-root': {
    color: alpha('#FFFFFF', 0.7),
  },
  '& .MuiSelect-icon': {
    color: alpha('#FFFFFF', 0.7),
  },
}));

const StyledLink = styled(MuiLink)(({ theme }) => ({
  color: alpha('#FFFFFF', 0.7),
  textDecoration: 'none',
  fontSize: '0.875rem',
  '&:hover': {
    color: '#FFFFFF',
  },
}));

const HelpText = styled(Typography)(({ theme }) => ({
  color: alpha('#FFFFFF', 0.5),
  fontSize: '0.875rem',
  textAlign: 'center',
  marginTop: theme.spacing(4),
}));

const DevModeText = styled(Typography)(({ theme }) => ({
  color: '#FFD700',
  fontSize: '0.875rem',
  textAlign: 'center',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: alpha('#FFD700', 0.1),
  borderRadius: theme.shape.borderRadius,
}));

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'Officer',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (event: any) => {
    setCredentials(prev => ({
      ...prev,
      role: event.target.value,
    }));
  };

  const handleDevLogin = () => {
    try {
      const mockResponse = {
        user: {
          id: 'dev-user',
          name: `Test ${credentials.role}`,
          rank: credentials.role === 'Officer' ? 'CPT' : credentials.role === 'NCO' ? 'SSG' : 'SPC',
          role: credentials.role.toLowerCase(),
          classification: 'SECRET',
          permissions: ['read', 'write'],
        },
        token: 'dev-token',
      };
      localStorage.setItem('token', mockResponse.token);
      dispatch({ 
        type: 'auth/login/fulfilled',
        payload: mockResponse
      });
      navigate(`/${mockResponse.user.role}/property`);
    } catch (err) {
      console.error('Dev login failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    dispatch(clearError());

    try {
      if (isDevelopment) {
        handleDevLogin();
        return;
      }

      await dispatch(login(credentials)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer maxWidth={false}>
      <LogoContainer>
        <LogoText>HandReceipt</LogoText>
      </LogoContainer>

      <StyledPaper elevation={0}>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                backgroundColor: 'transparent',
                color: theme.palette.error.main,
                border: `1px solid ${theme.palette.error.main}`,
              }}
            >
              {error}
            </Alert>
          )}

          {isDevelopment && (
            <StyledFormControl>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={credentials.role}
                label="Role"
                onChange={handleRoleChange}
                sx={{
                  color: '#FFFFFF',
                  '& .MuiSelect-icon': {
                    color: '#FFFFFF',
                  },
                }}
              >
                <MenuItem value="Officer">Officer</MenuItem>
                <MenuItem value="NCO">NCO</MenuItem>
                <MenuItem value="Soldier">Soldier</MenuItem>
              </Select>
            </StyledFormControl>
          )}

          {!isDevelopment && (
            <>
              <StyledTextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={credentials.username}
                onChange={handleInputChange}
              />

              <StyledTextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#FFFFFF' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Signing in...' : isDevelopment ? 'Dev Login' : 'Sign In'}
          </StyledButton>

          {!isDevelopment && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                <StyledLink>
                  Forgot password?
                </StyledLink>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <StyledLink>
                  Create an account
                </StyledLink>
              </Link>
            </Box>
          )}
        </Box>

        {isDevelopment && (
          <DevModeText>
            Development Mode: Click "Dev Login" to sign in with the selected role
          </DevModeText>
        )}

        <HelpText>
          For assistance, contact your unit's S6 or system administrator
        </HelpText>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;