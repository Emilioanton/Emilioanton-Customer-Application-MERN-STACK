import React, { useState, useContext, useRef } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import { AuthContext } from "../Context/AuthContext";
import { Box, FormGroup, Typography, FormControl, InputLabel, Dialog, InputAdornment, IconButton, FilledInput, CircularProgress, Toolbar, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Footer from "./Footer";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import bg from "../images/bg.jpg";

const useStyles = makeStyles({
  loginContent: {
    marginBottom: "30px",
    width: "auto",
  },
  loginBox: {
    backgroundColor: "rgba(0,0,0,.86)",
    borderRadius: "4px",
    position: "fixed",
    padding: "60px",
    width: "auto",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: "750px",
  },

  maincontainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  root: {
    backgroundColor: "black",
    position: "relative",
  },
});

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const { username, password, showPassword } = user;
  const [message, setMessage] = useState(null);
  const [emptyusern, setEmptyusern] = useState(false);
  const [emptypassw, setEmptypassw] = useState(false);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  let navigate = useNavigate();

  const onChange = (e) => {
    if (username !== "") {
      setEmptyusern(false);
    }
    if (password !== "") {
      setEmptypassw(false);
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let timerID = useRef(null);

  function handleClick(event) {
    event.preventDefault();
    if (username === "" && password === "") {
      setEmptyusern(true);
      setEmptypassw(true);
    } else if (password === "") {
      setEmptypassw(true);
    } else if (username === "") {
      setEmptyusern(true);
    } else {
      setLoading(true);
      onSubmit();
    }
  }

  const onSubmit = (e) => {
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        timerID = setTimeout(() => {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          navigate("/");
        }, 750);
      } else {
        timerID = setTimeout(() => {
          setOpenDel(true);
          setMessage(message);
          setEmptypassw(true);
          setEmptyusern(true);
          setLoading(false);
        }, 750);
      }
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !showPassword,
    });
  };
  const [openDel, setOpenDel] = useState(true);

  const handleClose = (e) => {
    setOpenDel(false);
  };

  return (
    <div className={classes.maincontainer}>
      <CardMedia
        component="img"
        image={bg}
        style={{
          position: "fixed",
          filter: "blur(1px)",
          marginTop: "500px",
          width: "100%",
          height: "100%",
          minHeight: "1000px",
        }}
      />
      <Box className={classes.loginBox}>
        <form onSubmit={handleClick}>
          <FormGroup className={classes.loginContent}>
            {message ? (
              <Dialog maxWidth="xs" open={openDel} onClose={handleClose}>
                <Message message={message} />
              </Dialog>
            ) : null}
            <Typography variant="h4" style={{ color: "white", fontWeight: "bold", marginBottom: "20px" }}>
              Sign in
            </Typography>

            <FormControl variant="filled">
              <InputLabel style={{ color: "#a5a5a5" }} htmlFor="filled-adornment-username">
                Username
              </InputLabel>
              <FilledInput
                id="filled-adornment-username"
                error={emptyusern}
                onChange={(e) => onChange(e)}
                name="username"
                value={username}
                style={{ color: "white", backgroundColor: "#333", borderRadius: "6px" }}
              />
            </FormControl>

            <FormControl style={{ marginTop: "10px" }} variant="filled">
              <InputLabel style={{ color: "#a5a5a5" }} htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                error={emptypassw}
                onChange={(e) => onChange(e)}
                name="password"
                value={password}
                style={{ color: "white", backgroundColor: "#333", borderRadius: "6px" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" style={{ color: "white" }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl>
              <Box sx={{ my: 3 }}>
                <LoadingButton
                  loadingIndicator={<CircularProgress style={{ color: "white" }} size={25} />}
                  type="submit"
                  loading={loading}
                  variant="contained"
                  style={{ backgroundColor: "#e50914", fontWeight: "bold" }}
                  size="large"
                  fullWidth
                >
                  Sign In
                </LoadingButton>
              </Box>
            </FormControl>
          </FormGroup>
        </form>
      </Box>
      <div style={{ bottom: 0, zIndex: "1", position: "fixed" }}>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Login;
