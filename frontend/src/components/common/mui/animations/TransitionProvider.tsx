import React, { createContext, useContext, ReactNode, ReactElement, ComponentType } from 'react';
import { Fade, Grow, Slide, Zoom } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { SlideProps } from '@mui/material/Slide';
import { FadeProps } from '@mui/material/Fade';
import { GrowProps } from '@mui/material/Grow';
import { ZoomProps } from '@mui/material/Zoom';

type TransitionType = 'fade' | 'grow' | 'slide' | 'zoom';
type TransitionDirection = 'up' | 'down' | 'left' | 'right';

type AnyTransitionProps = TransitionProps & {
  children: ReactElement;
};

interface TransitionContextType {
  getTransition: (
    type: TransitionType,
    direction?: TransitionDirection
  ) => ComponentType<AnyTransitionProps>;
  duration: {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
  };
  easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  };
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }) => {
  // Military-grade precise timing
  const duration = {
    shortest: 150,  // Ultra-quick micro-interactions
    shorter: 200,   // Rapid state changes
    short: 250,     // Standard micro-interactions
    standard: 300,  // Default transitions
    complex: 375,   // Multi-step animations
    enteringScreen: 250,  // Optimized for readability
    leavingScreen: 200,   // Quick, precise exits
  };

  // Military-grade precise easing curves
  const easing = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',  // Smooth, controlled motion
    easeOut: 'cubic-bezier(0.2, 0, 0, 1)',      // Precise, deliberate exits
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',       // Sharp, authoritative entries
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',      // Military precision
  } as const;

  const getTransition = (type: TransitionType, direction: TransitionDirection = 'up'): ComponentType<AnyTransitionProps> => {
    const getCommonProps = (type: TransitionType) => {
      const baseProps = {
        timeout: {
          enter: duration.enteringScreen,
          exit: duration.leavingScreen,
        },
      };

      switch (type) {
        case 'fade':
          return {
            ...baseProps,
            easing: {
              enter: easing.easeOut,
              exit: easing.sharp,
            },
          };
        case 'grow':
          return {
            ...baseProps,
            easing: {
              enter: easing.easeOut,
              exit: easing.sharp,
            },
            transformOrigin: 'center center',
          };
        case 'slide':
          return {
            ...baseProps,
            easing: {
              enter: easing.easeOut,
              exit: easing.sharp,
            },
          };
        case 'zoom':
          return {
            ...baseProps,
            easing: {
              enter: easing.easeOut,
              exit: easing.sharp,
            },
            transformOrigin: 'center center',
          };
        default:
          return baseProps;
      }
    };

    switch (type) {
      case 'fade':
        return React.forwardRef((props: FadeProps, ref) => (
          <Fade {...getCommonProps('fade')} {...props} ref={ref} />
        )) as ComponentType<AnyTransitionProps>;
      
      case 'grow':
        return React.forwardRef((props: GrowProps, ref) => (
          <Grow {...getCommonProps('grow')} {...props} ref={ref} />
        )) as ComponentType<AnyTransitionProps>;
      
      case 'slide':
        return React.forwardRef((props: SlideProps, ref) => (
          <Slide {...getCommonProps('slide')} {...props} direction={direction} ref={ref} />
        )) as ComponentType<AnyTransitionProps>;
      
      case 'zoom':
        return React.forwardRef((props: ZoomProps, ref) => (
          <Zoom {...getCommonProps('zoom')} {...props} ref={ref} />
        )) as ComponentType<AnyTransitionProps>;
      
      default:
        return React.forwardRef((props: FadeProps, ref) => (
          <Fade {...getCommonProps('fade')} {...props} ref={ref} />
        )) as ComponentType<AnyTransitionProps>;
    }
  };

  const value = {
    getTransition,
    duration,
    easing,
  };

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};

// Utility components for common transitions
interface TransitionComponentProps {
  children: ReactElement;
  in: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

export const FadeTransition = React.forwardRef<HTMLDivElement, TransitionComponentProps>(
  ({ children, in: inProp, onEnter, onExited }, ref) => {
    const { duration, easing } = useTransition();
    return (
      <Fade 
        in={inProp} 
        timeout={{
          enter: duration.enteringScreen,
          exit: duration.leavingScreen,
        }}
        easing={{
          enter: easing.easeOut,
          exit: easing.sharp,
        }}
        onEnter={onEnter}
        onExited={onExited}
        ref={ref}
      >
        {children}
      </Fade>
    );
  }
);

FadeTransition.displayName = 'FadeTransition';

export const SlideUpTransition = React.forwardRef<HTMLDivElement, TransitionComponentProps>(
  ({ children, in: inProp, onEnter, onExited }, ref) => {
    const { duration, easing } = useTransition();
    return (
      <Slide 
        in={inProp} 
        timeout={{
          enter: duration.enteringScreen,
          exit: duration.leavingScreen,
        }}
        easing={{
          enter: easing.easeOut,
          exit: easing.sharp,
        }}
        direction="up"
        onEnter={onEnter}
        onExited={onExited}
        ref={ref}
      >
        {children}
      </Slide>
    );
  }
);

SlideUpTransition.displayName = 'SlideUpTransition';

export const GrowTransition = React.forwardRef<HTMLDivElement, TransitionComponentProps>(
  ({ children, in: inProp, onEnter, onExited }, ref) => {
    const { duration, easing } = useTransition();
    return (
      <Grow 
        in={inProp} 
        timeout={{
          enter: duration.enteringScreen,
          exit: duration.leavingScreen,
        }}
        easing={{
          enter: easing.easeOut,
          exit: easing.sharp,
        }}
        onEnter={onEnter}
        onExited={onExited}
        ref={ref}
      >
        {children}
      </Grow>
    );
  }
);

GrowTransition.displayName = 'GrowTransition';

export const ZoomTransition = React.forwardRef<HTMLDivElement, TransitionComponentProps>(
  ({ children, in: inProp, onEnter, onExited }, ref) => {
    const { duration, easing } = useTransition();
    return (
      <Zoom 
        in={inProp} 
        timeout={{
          enter: duration.enteringScreen,
          exit: duration.leavingScreen,
        }}
        easing={{
          enter: easing.easeOut,
          exit: easing.sharp,
        }}
        onEnter={onEnter}
        onExited={onExited}
        ref={ref}
      >
        {children}
      </Zoom>
    );
  }
);

ZoomTransition.displayName = 'ZoomTransition'; 