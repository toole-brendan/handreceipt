import React from 'react';
import { Box, styled } from '@mui/material';

export interface ScaleCardProps {
  children: React.ReactNode;
  hoverScale?: number;
  duration?: number;
  variant?: 'outlined' | 'contained';
  emphasis?: 'low' | 'medium' | 'high';
}

const AnimatedCard = styled(Box, {
  shouldForwardProp: (prop) => 
    !['hoverScale', 'variant', 'emphasis'].includes(prop as string),
})<{
  hoverScale: number;
  variant?: 'outlined' | 'contained';
  emphasis?: 'low' | 'medium' | 'high';
}>(({ hoverScale, variant = 'contained', emphasis = 'low' }) => {
  const getBackgroundColor = () => {
    switch (emphasis) {
      case 'high':
        return 'rgba(255, 255, 255, 0.08)';
      case 'medium':
        return 'rgba(255, 255, 255, 0.04)';
      case 'low':
      default:
        return '#000000';
    }
  };

  return {
    position: 'relative',
    backgroundColor: getBackgroundColor(),
    border: variant === 'outlined' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
    borderRadius: 0,
    padding: '24px',
    color: '#FFFFFF',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    
    '&::before': variant === 'outlined' ? {
      content: '""',
      position: 'absolute',
      top: -1,
      left: -1,
      right: -1,
      bottom: -1,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      opacity: 0,
      transition: 'opacity 200ms ease',
      pointerEvents: 'none',
    } : undefined,
    
    '&:hover': {
      transform: `scale(${hoverScale})`,
      backgroundColor: variant === 'outlined' 
        ? 'transparent'
        : 'rgba(255, 255, 255, 0.03)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      '&::before': variant === 'outlined' ? {
        opacity: 1,
      } : undefined,
    },
    
    willChange: 'transform, opacity',
  };
});

export const ScaleCard: React.FC<ScaleCardProps> = ({
  children,
  hoverScale = 1.02,
  duration = 200,
  variant = 'contained',
  emphasis = 'low',
}) => {
  return (
    <AnimatedCard
      hoverScale={hoverScale}
      variant={variant}
      emphasis={emphasis}
      sx={{
        transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {children}
    </AnimatedCard>
  );
}; 