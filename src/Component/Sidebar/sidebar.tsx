import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import type { Navigation, Session } from "@toolpad/core";
import { dataSideBar } from "./data";
import "./style.css";


const NAVIGATION: Navigation = dataSideBar;

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    h6: {
      fontFamily: "Poppins !important",
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
          "& .MuiToolbar-root": {
            backgroundColor: "#0e0f15",
            color: "#ffffff",
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
  const username = localStorage.getItem('username');


  const location = useLocation();
  const navigate = useNavigate();

  const router = React.useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path: string | URL) => {
        if (typeof path === "string") {
          navigate(path);
        } else {
          navigate(path.toString());
        }
      },
    };
  }, [location, navigate]);
  
  
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: username,
      email: '',
      image: '',
    },
  });

const authentication = React.useMemo(() => {
  return {
    signIn: () => {
      setSession({
        user: {
          name: username,
          email: '',
          image: '',
        },
      });
    },
    signOut: () => {
      setSession(null);
      localStorage.removeItem("token");
      navigate('/login');
    },
  };
}, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      session={session}
      theme={demoTheme}
      authentication={authentication}
      branding={{
        title: "HostMoney",
        logo: (
          <img src="/skull.png" alt="Logo" style={{ marginRight: "8px" }} />
        ),
      }}
    >
      <DashboardLayout disableCollapsibleSidebar={false}>
        {children}
      </DashboardLayout>
    </AppProvider>
  );
}
