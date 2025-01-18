import { navigationConfig } from '@/shared/components/components/common/navigation-config';

export const preloadRoute = (path: string) => {
  const route = navigationConfig
    .flatMap(section => section.items)
    .find(item => item.to === path);

  if (route?.component) {
    route.component.preload();
  }
}; 