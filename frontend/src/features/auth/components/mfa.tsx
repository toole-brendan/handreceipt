import React, { useState } from 'react';
import '@/ui/styles/pages/auth.css';

interface MFAProps {
  // ... rest of the component
}

const MFA: React.FC<MFAProps> = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [method, setMethod] = useState('app'); // 'app' | 'sms' | 'email'

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Two-Factor Authentication</h2>
        {/* MFA form content */}
      </div>
    </div>
  );
};

export default MFA;