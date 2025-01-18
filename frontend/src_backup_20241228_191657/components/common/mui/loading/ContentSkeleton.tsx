import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  styled,
} from '@mui/material';

interface ContentSkeletonProps {
  variant?: 'card' | 'list' | 'table';
  rows?: number;
  animation?: 'pulse' | 'wave';
  emphasis?: 'low' | 'medium' | 'high';
}

const StyledCard = styled(Card)<{ emphasis?: 'low' | 'medium' | 'high' }>
(({ emphasis = 'low' }) => {
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
    height: '100%',
    backgroundColor: getBackgroundColor(),
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 0,
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    
    '&::before': {
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
    },
    
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      '&::before': {
        opacity: 1,
      },
    },
  };
});

const SkeletonRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px',
  '&:last-child': {
    marginBottom: 0,
  },
}));

const StyledSkeleton = styled(Skeleton)(() => ({
  backgroundColor: 'rgba(255, 255, 255, 0.06)',
  borderRadius: 0,
  
  '&::after': {
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
  },
  
  '&.MuiSkeleton-text': {
    transform: 'scale(1)',
  },
  
  '&.MuiSkeleton-rectangular': {
    transform: 'scale(1)',
  },
  
  '&.MuiSkeleton-circular': {
    transform: 'scale(1)',
  },
}));

export const ContentSkeleton: React.FC<ContentSkeletonProps> = ({
  variant = 'card',
  rows = 3,
  animation = 'wave',
  emphasis = 'low',
}) => {
  const renderCardSkeleton = () => (
    <StyledCard emphasis={emphasis}>
      <CardContent sx={{ p: 3 }}>
        <StyledSkeleton
          variant="rectangular"
          height={24}
          width="60%"
          animation={animation}
          sx={{ mb: 3 }}
        />
        {Array.from({ length: rows }).map((_, index) => (
          <SkeletonRow key={index}>
            <StyledSkeleton
              variant="circular"
              width={40}
              height={40}
              animation={animation}
            />
            <Box sx={{ flex: 1 }}>
              <StyledSkeleton
                variant="text"
                width="80%"
                height={20}
                animation={animation}
                sx={{ mb: 1 }}
              />
              <StyledSkeleton
                variant="text"
                width="40%"
                height={16}
                animation={animation}
              />
            </Box>
          </SkeletonRow>
        ))}
      </CardContent>
    </StyledCard>
  );

  const renderListSkeleton = () => (
    <Box>
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonRow key={index}>
          <StyledSkeleton
            variant="text"
            width="100%"
            height={24}
            animation={animation}
          />
        </SkeletonRow>
      ))}
    </Box>
  );

  const renderTableSkeleton = () => (
    <Box>
      <SkeletonRow>
        {Array.from({ length: 4 }).map((_, index) => (
          <StyledSkeleton
            key={index}
            variant="rectangular"
            width={`${100 / 4}%`}
            height={40}
            animation={animation}
          />
        ))}
      </SkeletonRow>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <SkeletonRow key={rowIndex}>
          {Array.from({ length: 4 }).map((_, colIndex) => (
            <StyledSkeleton
              key={colIndex}
              variant="text"
              width={`${100 / 4}%`}
              height={24}
              animation={animation}
            />
          ))}
        </SkeletonRow>
      ))}
    </Box>
  );

  switch (variant) {
    case 'list':
      return renderListSkeleton();
    case 'table':
      return renderTableSkeleton();
    default:
      return renderCardSkeleton();
  }
}; 