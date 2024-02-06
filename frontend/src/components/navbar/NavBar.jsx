import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import myAvatar from "../../images/avatar2.png";
import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItem = [
    { label: "Landing Page", path: "/" },
    { label: "Explore", path: "/explore" },
    { label: "Market Place", path: "/market" },
  ];

  const userSettings = ["Profile", "Login", "Market Place", "Logout"];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderLinks = (item) => (
    <Link
      to={item.path}
      key={item.label}
      style={{ textDecoration: "none", color: "inherit", margin: "0 10px" }}
    >
      <Typography variant="button">{item.label}</Typography>
    </Link>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {menuItem.map((item) => (
          <ListItem button key={item.label} component={Link} to={item.path}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ backgroundColor: "#121111", color: "#FEFCF3" }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ position: "absolute", left: 0, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          {isMobile ? (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Logo
            </Typography>
          ) : (
            menuItem.map(renderLinks)
          )}
        </Box>

        <IconButton
          onClick={handleAvatarClick}
          sx={{
            position: isMobile ? "absolute" : "static",
            right: 0,
            color: "black",
          }}
        >
          <Avatar alt="profile" src={myAvatar} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          {userSettings.map((items) => (
            <MenuItem key={items} onClick={handleMenuClose}>
              <Typography textAlign="center">{items}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
