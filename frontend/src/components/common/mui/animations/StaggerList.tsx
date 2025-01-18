import React, { useEffect, useRef, useState } from 'react';
import { Box, styled, keyframes } from '@mui/material';

export interface StaggerListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  variant?: 'outlined' | 'contained';
  emphasis?: 'low' | 'medium' | 'high';
}

const getAnimation = (direction: string, distance: number = 30) => {
  switch (direction) {
    case 'up':
      return keyframes`
        from {
          transform: translateY(${distance}px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      `;
    case 'down':
      return keyframes`
        from {
          transform: translateY(-${distance}px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      `;
    case 'left':
      return keyframes`
        from {
          transform: translateX(${distance}px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      `;
    case 'right':
      return keyframes`
        from {
          transform: translateX(-${distance}px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      `;
    default:
      return keyframes`
        from {
          transform: translateY(${distance}px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      `;
  }
};

const StaggerItem = styled(Box, {
  shouldForwardProp: (prop) => 
    !['isVisible', 'index', 'staggerDelay', 'initialDelay', 'duration', 'direction', 'variant', 'emphasis'].includes(prop as string),
})<{
  isVisible: boolean;
  index: number;
  staggerDelay: number;
  initialDelay: number;
  duration: number;
  direction: string;
  variant?: 'outlined' | 'contained';
  emphasis?: 'low' | 'medium' | 'high';
}>(({ isVisible, index, staggerDelay, initialDelay, duration, direction, variant = 'contained', emphasis = 'low' }) => {
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
    opacity: 0,
    animation: isVisible
      ? `${getAnimation(direction)} ${duration}ms ${initialDelay + index * staggerDelay}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
      : 'none',
    backgroundColor: getBackgroundColor(),
    border: variant === 'outlined' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
    borderRadius: 0,
    padding: '16px',
    marginBottom: '8px',
    color: '#FFFFFF',
    position: 'relative',
    
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

export const StaggerList: React.FC<StaggerListProps> = ({
  children,
  staggerDelay = 80,
  initialDelay = 0,
  duration = 400,
  direction = 'up',
  threshold = 0.1,
  variant = 'contained',
  emphasis = 'low',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '30px',
      }
    );

    if (listRef.current) {
      observer.observe(listRef.current);
    }

    return () => {
      if (listRef.current) {
        observer.unobserve(listRef.current);
      }
    };
  }, [threshold]);

  return (
    <Box ref={listRef}>
      {React.Children.map(children, (child, index) => (
        <StaggerItem
          isVisible={isVisible}
          index={index}
          staggerDelay={staggerDelay}
          initialDelay={initialDelay}
          duration={duration}
          direction={direction}
          variant={variant}
          emphasis={emphasis}
        >
          {child}
        </StaggerItem>
      ))}
    </Box>
  );
}; 