import React from 'react';

export const VerifyNowButton: React.FC = () => {
  const handleVerify = () => {
    console.log('Verification initiated');
  };

  return (
    <button 
      className="verify-now-button"
      onClick={handleVerify}
    >
      Verify Now
    </button>
  );
};
