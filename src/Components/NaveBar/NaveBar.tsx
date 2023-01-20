import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { ModalConfirm } from "../ModalConfirm/ModalConfirm";
import clientAuth from "../../Client/User";

const pages = [
  { name: "About", link: "about" },
  { name: "Characters", link: "characters" },
  { name: "Contact", link: "contact" },
];

const DICIONARY = {
  modalConfirm: "Você tem certeza que deseja sair?",
};

type setting = {
  name: string;
  path: string;
  handler: () => void;
};

export const ResponsiveAppBar = () => {
  const { userLogged, setUserLogged } = React.useContext(AuthContext);
  const [openModalConfirm, setOpenModalConfirm] = React.useState(false);
  const navigate = useNavigate();
  const [settings, setSettings] = React.useState<setting[]>([]);

  React.useEffect(() => {
    console.log("chamou!");
    const setting = userLogged.isLoggedIn
      ? [
          {
            name: "Profile",
            path: "profile",
            handler: () => {
              handleCloseNavMenu();
            },
          },
          {
            name: "Account",
            path: "Account",
            handler: () => {
              handleCloseNavMenu();
            },
          },
          {
            name: "Logout",
            path: "#",
            handler: () => {
              setOpenModalConfirm(true);
              handleCloseNavMenu();
            },
          },
        ]
      : [
          {
            name: "Login",
            path: "Login",
            handler: () => {
              handleCloseNavMenu();
            },
          },
        ];

    setSettings(setting);
  }, [userLogged]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const logout = async () => {
    await clientAuth.logoutUser();
    localStorage.removeItem("userLogged");
    setUserLogged({ isLoggedIn: false });
    setOpenModalConfirm(false);
    navigate("/");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "black" }}>
      {
        <ModalConfirm
          openModal={openModalConfirm}
          message={DICIONARY.modalConfirm}
          setOpenModal={setOpenModalConfirm}
          setAccept={logout}
        />
      }
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 900,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ICFLIX
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    navigate(`/${page.link}`);
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ICFLIX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  navigate(`/${page.link}`);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="avatar" src={userLogged.avatarUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <Link
                  key={index}
                  style={{ textDecoration: "none", color: "black" }}
                  to={settings[index].path}
                >
                  <MenuItem key={index} onClick={settings[index].handler}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
