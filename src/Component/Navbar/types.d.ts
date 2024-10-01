import type { NavigationItem } from '@toolpad/core';

declare module '@toolpad/core' {
  interface NavigationItem {
    path?: string;
  }
}