import React, { useState, useEffect } from 'react';
import { FiShield, FiX } from 'react-icons/fi';
import { styled, alpha, Theme } from '@mui/material';

interface MFAProps {
  onVerify: (code: string) => void;
  onCancel: () => void;
}

const StyledContainer = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.95)',
  backdropFilter: 'blur(12px)',
  padding: theme.spacing(3),
  zIndex: 1200,
  animation: 'fadeIn 0.3s ease-out',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

const StyledPanel = styled('div')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: '400px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(12px)',
  borderRadius: 0,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  padding: theme.spacing(4),
  position: 'relative',
  animation: 'slideUp 0.3s ease-out',
  '@keyframes slideUp': {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
}));

const StyledHeader = styled('div')(({ theme }: { theme: Theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  '.mfa-icon': {
    fontSize: '2.5rem',
    color: '#FFFFFF',
    marginBottom: theme.spacing(2),
  },
  'h2': {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: theme.spacing(1),
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '0.02em',
  },
  'p': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '0.015em',
  },
}));

const StyledForm = styled('form')(({ theme }: { theme: Theme }) => ({
  '.code-input': {
    width: '100%',
    textAlign: 'center',
    letterSpacing: '0.5em',
    padding: theme.spacing(1.5),
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 0,
    color: '#FFFFFF',
    fontSize: '1.5rem',
    fontFamily: 'monospace',
    marginBottom: theme.spacing(3),
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
  },
  '.button-group': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(2),
  },
  '.verify-button, .cancel-button': {
    padding: theme.spacing(1.5),
    borderRadius: 0,
    fontSize: '0.9375rem',
    fontWeight: 600,
    fontFamily: 'Inter, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: theme.transitions.create(['background-color', 'transform', 'box-shadow']),
    '&:hover': {
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      transform: 'none',
      opacity: 0.7,
    },
  },
  '.verify-button': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    },
  },
  '.cancel-button': {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
}));

const CloseButton = styled('button')(({ theme }: { theme: Theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'transparent',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.7)',
  padding: theme.spacing(1),
  cursor: 'pointer',
  borderRadius: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['background-color', 'color']),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#FFFFFF',
  },
}));

export const MFA: React.FC<MFAProps> = ({ onVerify, onCancel }) => {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onCancel();
    }
  }, [timeLeft, onCancel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    }
  };

  const formatTime = (seconds: number): string => {
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  };

  return (
    <StyledContainer>
      <StyledPanel>
        <CloseButton onClick={onCancel} aria-label="Close">
          <FiX size={20} />
        </CloseButton>

        <StyledHeader>
          <FiShield className="mfa-icon" />
          <h2>Two-Factor Authentication</h2>
          <p>Enter the 6-digit code sent to your device</p>
          <p style={{ marginTop: '0.5em', color: 'warning.main' }}>
            Code expires in {formatTime(timeLeft)}
          </p>
        </StyledHeader>

        <StyledForm onSubmit={handleSubmit}>
          <input
            type="text"
            className="code-input"
            value={code}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              if (value.length <= 6) {
                setCode(value);
              }
            }}
            placeholder="000000"
            maxLength={6}
            pattern="[0-9]*"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
          />

          <div className="button-group">
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="verify-button"
              disabled={code.length !== 6}
            >
              Verify
            </button>
          </div>
        </StyledForm>
      </StyledPanel>
    </StyledContainer>
  );
};

export default MFA; 