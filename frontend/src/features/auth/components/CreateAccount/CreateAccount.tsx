import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled, Theme } from '@mui/material';

type Role = 'officer' | 'nco' | 'soldier';

const StyledContainer = styled('div')(({ theme }: { theme: Theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#000000',
  padding: theme.spacing(3),
}));

const StyledContent = styled('div')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: '420px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 0,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
}));

const StyledHeader = styled('div')(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(4, 4, 3),
  textAlign: 'left',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  'h1': {
    fontSize: '2rem',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: theme.spacing(1),
    letterSpacing: '0.02em',
    fontFamily: 'Inter, sans-serif',
  },
  'p': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '0.015em',
  },
}));

const StyledForm = styled('form')(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(3, 4, 4),
}));

const FormGroup = styled('div')(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2.5),
}));

const StyledInput = styled('input')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  padding: theme.spacing(1.75, 2),
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 0,
  color: '#FFFFFF',
  fontSize: '0.9375rem',
  fontFamily: 'Inter, sans-serif',
  letterSpacing: '0.01em',
  transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color']),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  '&:focus': {
    outline: 'none',
    borderColor: '#FFFFFF',
    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: 'Inter, sans-serif',
  },
}));

const StyledSelect = styled('select')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  padding: theme.spacing(1.75, 2),
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 0,
  color: '#FFFFFF',
  fontSize: '0.9375rem',
  fontFamily: 'Inter, sans-serif',
  letterSpacing: '0.01em',
  transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color']),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  '&:focus': {
    outline: 'none',
    borderColor: '#FFFFFF',
    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '& option': {
    backgroundColor: '#000000',
  },
}));

const StatusMessage = styled('div')<{ variant: 'error' | 'success' }>(
  ({ theme, variant }) => ({
    padding: theme.spacing(1.75, 2),
    marginBottom: theme.spacing(2.5),
    borderRadius: 0,
    fontSize: '0.875rem',
    lineHeight: 1.4,
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '0.015em',
    backgroundColor: variant === 'error' 
      ? 'rgba(244, 67, 54, 0.1)' 
      : 'rgba(76, 175, 80, 0.1)',
    border: `1px solid ${
      variant === 'error' 
        ? 'rgba(244, 67, 54, 0.2)' 
        : 'rgba(76, 175, 80, 0.2)'
    }`,
    color: variant === 'error' ? '#F44336' : '#4CAF50',
  })
);

const PasswordStrength = styled('div')(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(1.5),
}));

const StrengthBar = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(0.75),
}));

const StrengthSegment = styled('div')<{ filled?: boolean; strength: number }>(
  ({ theme, filled, strength }) => ({
    flex: 1,
    height: 3,
    backgroundColor: filled 
      ? [
          '#F44336',
          '#FF9800',
          '#FFC107',
          '#4CAF50',
          '#43A047',
          '#388E3C',
        ][strength] 
      : 'rgba(255, 255, 255, 0.1)',
    borderRadius: 0,
    transition: theme.transitions.create('background-color'),
  })
);

const StrengthText = styled('span')(({ theme }: { theme: Theme }) => ({
  fontSize: '0.75rem',
  color: 'rgba(255, 255, 255, 0.5)',
  fontFamily: 'Inter, sans-serif',
  letterSpacing: '0.015em',
}));

const StyledButton = styled('button')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  padding: theme.spacing(1.75),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#FFFFFF',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 0,
  fontSize: '0.9375rem',
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow']),
  margin: theme.spacing(3, 0, 2),
  '&:hover:not(:disabled)': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  },
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
}));

const StyledLinks = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  textDecoration: 'none',
  fontSize: '0.875rem',
  fontFamily: 'Inter, sans-serif',
  letterSpacing: '0.015em',
  transition: theme.transitions.create('color'),
  '&:hover': {
    color: '#FFFFFF',
    textDecoration: 'none',
  },
}));

const LoadingSpinner = styled('div')(({ theme }: { theme: Theme }) => ({
  width: 20,
  height: 20,
  border: '2px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
  borderTopColor: '#FFFFFF',
  animation: 'spin 0.8s linear infinite',
  margin: '0 auto',
  '@keyframes spin': {
    to: {
      transform: 'rotate(360deg)',
    },
  },
}));

const CreateAccount: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: '' as Role,
    unit: '',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.username || !formData.password || !formData.confirmPassword || !formData.role || !formData.unit) {
      setStatus('error');
      setMessage('All fields are required');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return false;
    }

    if (passwordStrength < 3) {
      setStatus('error');
      setMessage('Password is not strong enough');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage(null);
    setStatus('idle');

    try {
      // In development, simulate account creation
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus('success');
        setMessage('Account created successfully');
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      // In production, this would create the account
      setStatus('error');
      setMessage('Account creation not implemented in production yet');
    } catch (error) {
      setStatus('error');
      setMessage('Could not create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledContent>
        <StyledHeader>
          <h1>Create Account</h1>
          <p>Join HandReceipt to manage your unit's equipment</p>
        </StyledHeader>

        <StyledForm onSubmit={handleSubmit}>
          {message && (
            <StatusMessage variant={status === 'error' ? 'error' : 'success'}>
              {message}
            </StatusMessage>
          )}

          <FormGroup>
            <StyledInput
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <StyledInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              disabled={loading}
            />
            <PasswordStrength>
              <StrengthBar>
                {Array.from({ length: 5 }).map((_, index) => (
                  <StrengthSegment 
                    key={index} 
                    filled={index < passwordStrength}
                    strength={passwordStrength}
                  />
                ))}
              </StrengthBar>
              <StrengthText>
                {passwordStrength === 0 && 'Very Weak'}
                {passwordStrength === 1 && 'Weak'}
                {passwordStrength === 2 && 'Fair'}
                {passwordStrength === 3 && 'Good'}
                {passwordStrength === 4 && 'Strong'}
                {passwordStrength === 5 && 'Very Strong'}
              </StrengthText>
            </PasswordStrength>
          </FormGroup>

          <FormGroup>
            <StyledInput
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <StyledSelect
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              disabled={loading}
            >
              <option value="">Select Role</option>
              <option value="officer">Officer</option>
              <option value="nco">NCO</option>
              <option value="soldier">Soldier</option>
            </StyledSelect>
          </FormGroup>

          <FormGroup>
            <StyledInput
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              placeholder="Unit Information"
              disabled={loading}
            />
          </FormGroup>

          <StyledButton 
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              'Create Account'
            )}
          </StyledButton>

          <StyledLinks>
            <StyledLink to="/login">
              Back to Login
            </StyledLink>
          </StyledLinks>
        </StyledForm>
      </StyledContent>
    </StyledContainer>
  );
};

export default CreateAccount; 