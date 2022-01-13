import React, { useState, useRef } from "react";
import { FormGroup, FormControl, InputLabel, Input, Button, Typography, Switch, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import UserService from "../Services/UserService";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const initialValue = {
  companyname: "",
  username: "",
  custnumb: "",
  password: "",
  role: "",
  language: "",
};

const useStyles = makeStyles({
  container: {
    width: "400px",
    display: "flex",
    justifyContent: "space-between",
    padding: "10",
  },
});

const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const { companyname, username, custnumb, role, password, language } = user;
  const [message, setMessage] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  let timerID = useRef(null);
  const classes = useStyles();
  let navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    await UserService.createUsers(user).then((data) => {
      const { message } = data;
      setMessage(message);
      if (!message.msgError) {
        timerID = setTimeout(() => {
          navigate("/admin");
        }, 2000);
      }
    });
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
          Add User
        </Typography>
        <FormControl variant="standard">
          <InputLabel htmlFor="my-input">Compnayname</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="companyname" value={companyname} />
        </FormControl>
        <br />
        <FormControl variant="standard">
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="username" value={username} />
        </FormControl>
        <br />
        <FormControl variant="standard">
          <InputLabel htmlFor="my-input">Customernumber</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="custnumb" value={custnumb} />
        </FormControl>
        <br />
        <FormControl variant="standard">
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="password" value={password} type="password" />
        </FormControl>
        <Box>
          <Input type="hidden" onChange={(e) => onValueChange(e)} name="language" value={defLang()} />
          <Input type="hidden" onChange={(e) => onValueChange(e)} name="role" value={defAdmin()} />
        </Box>

        <FormControl>
          <Typography> Set language to english (defualt SV)</Typography>
          <Switch checked={ifLangChecked()} onChange={handleLang} />
        </FormControl>

        <FormControl>
          <Typography>Make admin (default user rights)</Typography>
          <Switch checked={ifAdminChecked()} onChange={handleAdmin} />
        </FormControl>

        <FormControl>
          <Button style={{ marginTop: "10px" }} variant="contained" color="primary" onClick={() => addUserDetails()}>
            <AddIcon />
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
        <div style={{ paddingTop: "20px" }}>{message ? <Message message={message} /> : null}</div>
      </FormGroup>
    </Box>
  );
};

export default AddUser;
