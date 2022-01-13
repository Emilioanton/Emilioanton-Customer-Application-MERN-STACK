import React, { useState, useEffect, useRef, useContext } from "react";
import { FormGroup, FormControl, InputLabel, FilledInput, Input, Button, Typography, Box, Switch, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../Services/UserService";
import Message from "../Components/Message";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Edit from "@mui/icons-material/Edit";
import { AuthContext } from "../Context/AuthContext";

const initialValue = {
  companyname: "",
  username: "",
  role: "",
  custnumb: "",
  language: "",
  password: "",
};

const useStyles = makeStyles({
  container: {
    width: "400px",
    display: "flex",
    justifyContent: "space-between",
    padding: "10",
  },
});

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  // const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const { companyname, username, role, custnumb, language, password } = user;
  const [message, setMessage] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  let timerID = useRef(null);
  const { id } = useParams();
  const classes = useStyles();
  let navigate = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await UserService.getUserById(id);
    setUser(response);
  };

  const editUserDetails = async () => {
    await UserService.updateUsers(user).then((data) => {
      const { message } = data;
      setMessage(message);
      if (!message.msgError) {
        timerID = setTimeout(() => {
          navigate("/admin");
        }, 2000);
      }
    });
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Switch controller for Language
  const handleLang = (e) => {
    setIsSwitchOn(!isSwitchOn);
    if (e.target.checked) {
      user.language = "EN";
    } else {
      user.language = "SV";
    }
  };

  const ifLangChecked = () => {
    if (user.language === "EN") {
      return true;
    } else {
      return false;
    }
  };

  const defLang = () => {
    if (ifLangChecked(true)) {
      return (user.language = "EN");
    } else {
      return (user.language = "SV");
    }
  };
  // END

  // Switch controller for make admin
  const handleAdmin = (e) => {
    setIsSwitchOn(!isSwitchOn);
    if (e.target.checked) {
      user.role = "admin";
    } else {
      return (user.role = "user");
    }
  };

  const ifAdminChecked = () => {
    if (user.role === "admin") {
      return true;
    } else {
      return false;
    }
  };

  const defAdmin = () => {
    if (ifAdminChecked(true)) {
      return (user.role = "admin");
    } else {
      return (user.role = "user");
    }
  };
  // END

  return (
    <Box style={{ display: "flex", justifyContent: "center", paddingTop: "200px" }}>
      <FormGroup className={classes.container}>
        <Typography variant="h4" style={{ marginBottom: "30px" }}>
          Edit {companyname}
        </Typography>
        <FormControl variant="standard">
          <InputLabel htmlFor="my-input">Companyname</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="companyname" value={companyname} aria-describedby="my-helper-text" />
        </FormControl>
        <br />
        <FormControl variant="standard">
          <InputLabel htmlFor="my-input">Enter a new username</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="username" aria-describedby="my-helper-text" />
        </FormControl>
        <br />
        <FormControl variant="standard">
          <InputLabel htmlFor="my-input">Customernumber</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="custnumb" value={custnumb} aria-describedby="my-helper-text" />
        </FormControl>
        <br />
        <FormControl variant="standard">
          <InputLabel htmlFor="my-input">Enter a new password</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="password" type="password" value={password} aria-describedby="my-helper-text" />
        </FormControl>
        <br />
        <FormControl>
          <Typography>
            Language: <text style={{ fontWeight: "bold" }}>{user.language}</text>
          </Typography>
          <Switch checked={ifLangChecked()} onChange={handleLang} />
        </FormControl>
        <br />
        <FormControl>
          <Typography>
            Role: <text style={{ fontWeight: "bold" }}>{user.role.toUpperCase()}</text>
          </Typography>
          <Switch checked={ifAdminChecked()} onChange={handleAdmin} />
        </FormControl>
        <br />
        <FormControl>
          <Button variant="contained" color="primary" onClick={() => editUserDetails()}>
            <Edit />
          </Button>
        </FormControl>
        <Button
          variant="contained"
          style={{ backgroundColor: "#e60000", color: "#FFFFFF", marginTop: "10px" }}
          onClick={() => {
            navigate("/admin");
          }}
        >
          <ArrowBack />
        </Button>

        <div style={{ paddingTop: "20px" }}> {message ? <Message message={message} /> : null}</div>
      </FormGroup>
    </Box>
  );
};

export default EditUser;
