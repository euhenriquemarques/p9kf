import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Navigation } from '@toolpad/core';
import { dataSideBar } from '../Menu/data';

const NAVIGATION: Navigation = dataSideBar;

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});



interface DemoProps {
  children?: React.ReactNode;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { children } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const router = React.useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path: string | URL) => {
        if (typeof path === 'string') {
          navigate(path);
        } else {
          navigate(path.toString());
        }
      },
    };
  }, [location, navigate]);

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AppProvider>
  );
}
