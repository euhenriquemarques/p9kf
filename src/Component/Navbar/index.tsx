import React, { MouseEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./style.css";
import { Egg } from "@mui/icons-material";
import DashboardLayoutBasic from "../Sidebar/sidebar";

interface MenuItemType {
  text: string;
  link: string;
}

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCadastro, setOpenCadastro] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseMenuCadastro = () => {
    setOpenCadastro(false);
  };

  const accountMenuItems = [
    {
      text: "Conta",
      icon: <SettingsIcon />,
      action: () => {
        navigate("/configuracao");
      },
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      action: () => {
        // Implementar a lógica de logout aqui
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const cadastroMenuItens = [
    {
      text: "Banco",
      icon: <SettingsIcon />,
      action: () => {
        navigate("/cadastro");
      },
    },
    {
      text: "Usuario",
      icon: <LogoutIcon />,
      action: () => {
        // Implementar a lógica de logout aqui
        localStorage.removeItem("token"); // Exemplo de remoção de token
        navigate("/cadastro/usuario");
      },
    },
  ];

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
        Menu
      </Typography>
      <Divider />
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "#0e0f15",
        }}
      >
        <Toolbar>
    
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontFamily: "Anton",
              fontSize: "2rem",
              flexGrow: 1,
              textDecoration: "none",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
            }}
          >
            NestEgg
          </Typography>

          <Menu
            id="account-menu"
            open={openCadastro}
            onClose={handleCloseMenuCadastro}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {cadastroMenuItens.map((item) => (
              <MenuItem
                key={item.text}
                onClick={() => {
                  handleCloseMenuCadastro();
                  item.action();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </MenuItem>
            ))}
          </Menu>

          {/* Ícone de Conta */}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="conta"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ ml: 2 }}
          >
            <Egg />
          </IconButton>

          {/* Menu de Conta */}
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {accountMenuItems.map((item) => (
              <MenuItem
                key={item.text}
                onClick={() => {
                  handleCloseMenu();
                  item.action();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </MenuItem>
            ))}
          </Menu>

          {/* Menu Hambúrguer para telas menores */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <hr className="custom-hr" />
      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <hr className="custom-hr" />
    </>
  );
};

export default Navbar;
