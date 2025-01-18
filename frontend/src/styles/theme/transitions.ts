import { Theme } from '@mui/material/styles';

// Define custom transition durations
const durations = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195,
};

// Define custom transition easings
const easings = {
  easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
  // Military-grade custom easings
  precise: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  elevation: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
};

// Define transition configurations
export const transitions = {
  duration: durations,
  easing: easings,
  create: (
    props: string | string[] = ['all'],
    options: {
      duration?: number;
      easing?: string;
      delay?: number;
    } = {}
  ) => {
    const {
      duration = durations.standard,
      easing = easings.precise,
      delay = 0,
    } = options;

    const properties = Array.isArray(props) ? props : [props];

    return properties
      .map(
        (prop) =>
          `${prop} ${duration}ms ${easing}${delay ? ` ${delay}ms` : ''}`
      )
      .join(',');
  },
  getAutoHeightDuration: (height: number) => {
    if (!height) return 0;
    const constant = height / 36;
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
  },
} as Theme['transitions']; 