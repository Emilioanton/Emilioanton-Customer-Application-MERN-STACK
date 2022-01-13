import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import useStyles from "../styles/styles";
import hydroware from "../images/hydroware.png";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import EditOwnUser from "./EditOwnUser";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const classes = useStyles();
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        setAnchorEl(null);
        navigate("/");
      }
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [opencontact, setOpenContact] = useState(false);

  const handleClickContact = () => {
    setOpenContact(true);
    setAnchorEl(null);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const handleClickEdit = () => {
    setOpenEdit(true);
    setAnchorEl(null);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const headMenu = () => {
    return (
      <>
        {!isAuthenticated ? null : (
          <div style={{ marginRight: "40px" }}>
            <Button
              style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {user.companyname}
              <AccountCircleIcon sx={{ fontSize: "35px", marginLeft: "5px" }} />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClickEdit}>Edit account</MenuItem>
              <MenuItem onClick={handleClickContact}>Contact us</MenuItem>
              <MenuItem onClick={onClickLogoutHandler}>Sign out</MenuItem>
            </Menu>
            <Dialog maxWidth="xs" open={openEdit} onClose={handleCloseEdit}>
              <div style={{ backgroundColor: "white" }}>
                <DialogContent>
                  <IconButton onClick={handleCloseEdit} disableRipple={true} style={{ backgroundColor: "inherit", float: "right", color: "black" }}>
                    <CloseIcon />
                  </IconButton>
                  <EditOwnUser />
                </DialogContent>
              </div>
            </Dialog>

            <Dialog maxWidth="xs" open={opencontact} onClose={handleCloseContact}>
              <div style={{ backgroundColor: "white" }}>
                <IconButton onClick={handleCloseContact} disableRipple={true} style={{ backgroundColor: "inherit", float: "right", color: "black" }}>
                  <CloseIcon />
                </IconButton>
                <DialogTitle>Contact Us</DialogTitle>
                <DialogContent>
                  <Typography style={{ fontSize: "17px", color: "", fontWeight: "bold" }}>
                    <Typography style={{ fontWeight: "bold" }}> </Typography>
                    <a href="mailto:info@hydroware.se?subject=WebRel Support" style={{ color: "inherit", textDecoration: "none" }}>
                      info@hydroware.se
                    </a>
                  </Typography>
                  <Typography style={{ fontSize: "16px", color: "", fontWeight: "bold" }}>
                    <a href="mailto:it@hydroware.se?subject=WebRel Support" style={{ color: "inherit", textDecoration: "none" }}>
                      it@hydroware.se
                    </a>
                  </Typography>
                </DialogContent>
              </div>
            </Dialog>
          </div>
        )}
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Button to="/" component={Link} color="inherit">
          Home
        </Button>
        {user.role === "admin" ? (
          <Button to="/admin" component={Link} color="inherit">
            Admin
          </Button>
        ) : null}
      </>
    );
  };
  return (
    <AppBar style={{ backgroundColor: "black", height: "90px" }}>
      <Toolbar>
        <a href="/">
          <img className={classes.logo} src={hydroware} alt="hydroware" />
        </a>
        <Typography variant="h6" className={classes.submenu}></Typography>
        {headMenu()}
      </Toolbar>
      <div className={classes.subAppBar}>
        <Typography variant="h6" className={classes.submenu}>
          {!isAuthenticated ? null : authenticatedNavBar()}
        </Typography>
      </div>
    </AppBar>
  );
};

export default Navbar;
