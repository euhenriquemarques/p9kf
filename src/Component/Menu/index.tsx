import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import { dataMenu } from "./data";

interface SidebarProps {
}

const Menu: React.FC<SidebarProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const accountMenuItems = dataMenu(navigate);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };



  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {accountMenuItems.map((item) => (
        <ListItem
          key={item.text}

        >
          {item.categoria ? (
            <>
              <hr />
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  mt: 2, ml: 1, fontFamily: "Anton",
                  fontSize: "1.05rem", borderTop: 1, borderColor: "#e0e0e0"
                }}
              />
            </>
          ) : (
            <>
              <ListItemText
                primary={item.text}
                onClick={item.action}
                primaryTypographyProps={{ ml: 3, fontFamily: 'Poppins, Arial, sans-serif', }}
                sx={{
                  transition: "all 0.3s ease", // Transição suave
                  "&:hover": {
                    boxShadow: "0px 4px 25px -8px #0e0f15", // Sombra só na parte de baixo com cor verde fluorescente
                  },
                  cursor: "pointer", // Indica que o item é clicável
                }}
              />
            </>
          )}
        </ListItem>
      ))}
    </Box>
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </>
  );
};

export default Menu;
