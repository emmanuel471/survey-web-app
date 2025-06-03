import React, { useState } from "react";
import {
  Typography,
  Box,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const NavBar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { label: "FILL OUT SURVEY", path: "/" },
    { label: "VIEW SURVEY RESULTS", path: "/view" },
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const renderLinks = (onClick) =>
    links.map(({ label, path }) => (
      <Link
        key={path}
        className={`link_item ${
          location.pathname === path ? "active_link" : ""
        }`}
        href={path}
        underline="none"
        color="inherit"
        onClick={onClick}
        sx={{ display: "block", padding: "8px 16px" }}
      >
        {label}
      </Link>
    ));

  return (
    <Box
      className="nav_container"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" component="div">
        _Surveys
      </Typography>

      {isSmallScreen ? (
        <>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box sx={{ width: 250, paddingTop: 2 }}>
              <List>
                {links.map(({ label, path }) => (
                  <ListItem
                    key={path}
                    button
                    component="a"
                    href={path}
                    onClick={toggleDrawer(false)}
                    selected={location.pathname === path}
                  >
                    <ListItemText primary={label} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <Box className="nav_links" sx={{ display: "flex", gap: 3 }}>
          {renderLinks()}
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
