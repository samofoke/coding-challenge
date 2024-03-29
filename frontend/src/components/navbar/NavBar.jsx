import React, { useState, Fragment, useContext } from "react";
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
import "./navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthUseContext";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path.includes(":userId") && user) {
      navigate(path.replace(":userId", user?._id));
    } else {
      navigate(path);
    }
  };

  const menuItem = [
    { label: "Explore", path: "/explore" },
    { label: "Market", path: "/market" },
  ];

  const userSettings = [
    { label: "Profile", path: "/profile/:userId" },
    { label: "Login", path: "/sign" },
    { label: "Logout", path: "/logout" },
  ];

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
      className="menu-item"
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
    <Fragment>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#423F3E",
          color: "#FEFCF3",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          },
          [theme.breakpoints.up("md")]: {
            ".MuiToolbar-root": {
              paddingLeft: "108px",
              paddingRight: "294px",
            },
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMobile && (
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ color: "white", marginRight: "auto" }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              flexGrow: isMobile ? 1 : 0,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Logo
            </Typography>
          </Link>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              {menuItem.map(renderLinks)}
            </Box>
          )}

          <IconButton
            onClick={handleAvatarClick}
            sx={{ color: "black", marginLeft: "auto" }}
          >
            <Avatar alt="profile" src={myAvatar} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {userSettings.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => {
                  handleNavigation(item.path);
                  handleMenuClose();
                }}
              >
                <Typography textAlign="center">{item.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
      </AppBar>
      <Outlet />
    </Fragment>
  );
};

export default NavBar;
