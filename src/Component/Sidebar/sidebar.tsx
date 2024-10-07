import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Navigation, Session } from '@toolpad/core';
import { dataSideBar } from './data';
import "./style.css";
import { log } from 'console';

const NAVIGATION: Navigation = dataSideBar;


const demoTheme = createTheme({
  typography: {
    h6: {
      fontFamily: "Anton !important",
      fontSize: "2rem",
      color: "#ffffff !important",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Define a cor do ícone no botão
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          '& .MuiToolbar-root': {
            backgroundColor: '#0e0f15',
            color: '#ffffff',
            
          },
        },
      },
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // 2. Fechar a sidebar ao clicar fora dela
  const sidebarRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    }

    // Adiciona o event listener
    window.addEventListener('mousedown', handleClickOutside);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  const router = React.useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path: string | URL) => {
        if (typeof path === 'string') {
          navigate(path);  // Apenas navegue para o caminho diretamente
        } else {
          navigate(path.toString());
        }
      },
    };
  }, [location, navigate]);

  

  return (
    
    <AppProvider  navigation={NAVIGATION} router={router} theme={demoTheme}  branding={{
      title: "NestEgg",
      logo: <span style={{ display: 'none' }} />,}}>
        <div ref={sidebarRef}>
        <DashboardLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
       
        {children}
        </DashboardLayout>
        </div>
    </AppProvider>
  );
}



