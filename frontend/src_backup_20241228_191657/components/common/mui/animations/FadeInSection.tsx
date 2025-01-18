import React, { useEffect, useRef, useState } from 'react';
import { Box, styled } from '@mui/material';

export interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  threshold?: number;
  variant?: 'outlined' | 'contained';
  emphasis?: 'low' | 'medium' | 'high';
}

const AnimatedSection = styled(Box, {
  shouldForwardProp: (prop) => 
    !['isVisible', 'animationDelay', 'animationDuration', 'direction', 'variant', 'emphasis'].includes(prop as string),
})<{
  isVisible: boolean;
  animationDelay: number;
  animationDuration: number;
  direction: string;
  variant?: 'outlined' | 'contained';
  emphasis?: 'low' | 'medium' | 'high';
}>(({ isVisible, animationDelay, animationDuration, direction, variant = 'contained', emphasis = 'low' }) => {
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

  const getTransform = () => {
    const distance = '30px';
    switch (direction) {
      case 'up':
        return `translateY(${distance})`;
      case 'down':
        return `translateY(-${distance})`;
      case 'left':
        return `translateX(${distance})`;
      case 'right':
        return `translateX(-${distance})`;
      default:
        return 'none';
    }
  };
  
  return {
    opacity: 0,
    transform: getTransform(),
    transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1) ${animationDelay}ms`,
    ...(isVisible && {
      opacity: 1,
      transform: 'none',
    }),
    
    // Military-grade styling
    backgroundColor: getBackgroundColor(),
    border: variant === 'outlined' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
    borderRadius: 0,
    color: '#FFFFFF',
    padding: '24px',
    position: 'relative',
    
    '&:hover': {
      backgroundColor: variant === 'outlined' 
        ? 'transparent'
        : 'rgba(255, 255, 255, 0.03)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    
    '&::before': variant === 'outlined' ? {
      content: '""',
      position: 'absolute',
      top: -1,
      left: -1,
      right: -1,
      bottom: -1,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      pointerEvents: 'none',
      transition: 'opacity 0.2s ease',
      opacity: 0,
    } : undefined,
    
    '&:hover::before': variant === 'outlined' ? {
      opacity: 1,
    } : undefined,
    
    willChange: 'transform, opacity',
  };
});

export const FadeInSection = React.forwardRef<HTMLDivElement, FadeInSectionProps>(({
  children,
  delay = 0,
  direction = 'up',
  duration = 500,
  threshold = 0.1,
  variant = 'contained',
  emphasis = 'low',
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const localRef = useRef<HTMLDivElement>(null);
  const resolvedRef = (ref || localRef) as React.RefObject<HTMLDivElement>;

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

    if (resolvedRef.current) {
      observer.observe(resolvedRef.current);
    }

    return () => {
      if (resolvedRef.current) {
        observer.unobserve(resolvedRef.current);
      }
    };
  }, [threshold, resolvedRef]);

  return (
    <AnimatedSection
      ref={resolvedRef}
      isVisible={isVisible}
      animationDelay={delay}
      animationDuration={duration}
      direction={direction}
      variant={variant}
      emphasis={emphasis}
    >
      {children}
    </AnimatedSection>
  );
});

FadeInSection.displayName = 'FadeInSection'; 