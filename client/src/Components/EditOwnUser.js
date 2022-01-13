import React, { useState, useEffect, useRef, useContext } from "react";
import { FormGroup, FormControl, InputLabel, Input, Button, Typography, Box, Switch, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import UserService from "../Services/UserService";
import Message from "../Components/Message";
import Alert from "@mui/material/Alert";
import Edit from "@mui/icons-material/Edit";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";

const useStyles = makeStyles({
  container: {
    width: "400px",
    display: "flex",
    justifyContent: "space-between",
    padding: "10",
  },
});

const initalInfo = { username: "", password: "" };

const EditOwnUser = () => {
  const [userEdit, setUserEdit] = useState(initalInfo);
  const { user, password, setUser } = useContext(AuthContext); // Gets information about current user logged in. (_id, username and password)
  const [message, setMessage] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    getUserByID();
    getUserUsername();
  }, []);

  // Handle information about current logged in user by _id from authcontext.
  const getUserByID = async () => {
    const response = await UserService.getUserById(user._id);
    setUserEdit(response);
  };

  // Handle username about current logged in user by _id from authcontext.
  const getUserUsername = async () => {
    const res = await UserService.getUsernameById(user._id);
    setYourUser(res);
  };

  const [yourUser, setYourUser] = useState({ username: "" }); // State for when user changes his username

  const ref = useRef();

  const resetcurrentpass = () => {
    ref.current.value = "";
  };

  // onSubmit -> check password if isAuthenticated is true -> post data, receive message from server and reset current password input.
  const editUserDetails = (e) => {
    AuthService.login(user).then((data) => {
      const { isAuthenticated } = data;
      if (isAuthenticated) {
        UserService.updateUsers(userEdit).then((data) => {
          const { message } = data;
          user.username = userEdit.username;
          setMessage(message);
          resetcurrentpass();
        });
      } else {
        setWrongpassw(true);
      }
    });
  };

  // When value changes on inputs Username & New password, also doing a reset of the error/success messages.
  const onValueChange = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
    setYourUser({ ...yourUser, [e.target.name]: e.target.value });
    setMessage(null);
  };

  // State for handling empty och wront entry of current password.
  const [wrongpassw, setWrongpassw] = useState(false);

  // When value changes on input current password, we check if password is not empty then we reset all error messages for a new try.
  const onChangeOldPassw = (e) => {
    if (password !== "") {
      setWrongpassw(false);
      setMessage(null);
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Function for disabling the button when no new entry has ben typed into the inputs
  const ifEmpty = () => {
    if (yourUser.username !== user.username) {
      return false;
    }
    if (userEdit.password !== "" && userEdit.password !== undefined) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Change Your User</Typography>
      <br />
      <br />
      <FormControl variant="standard">
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input onChange={(e) => onValueChange(e)} value={yourUser.username} name="username" aria-describedby="my-helper-text" />
      </FormControl>
      <br />
      <FormControl variant="standard">
        <InputLabel htmlFor="my-input">New Password</InputLabel>
        <Input onChange={(e) => onValueChange(e)} value={userEdit.password} name="password" type="password" aria-describedby="my-helper-text" inputRef={ref} />
      </FormControl>
      <br />
      <FormControl variant="standard">
        <InputLabel htmlFor="my-input">Current Password</InputLabel>
        <Input onChange={(e) => onChangeOldPassw(e)} error={wrongpassw} name="password" type="password" value={password} inputRef={ref} />
      </FormControl>
      <br />
      <br />
      <br />
      <br />
      <FormControl>
        <Button variant="contained" disabled={ifEmpty()} color="primary" onClick={() => editUserDetails()}>
          <Edit />
        </Button>
      </FormControl>
      <div style={{ paddingTop: "20px" }}> {message ? <Message message={message} /> : null}</div>
      <div style={{ paddingTop: "20px" }}> {wrongpassw ? <Alert severity="error">Your current password is incorrect or empty</Alert> : null}</div>
    </FormGroup>
  );
};

export default EditOwnUser;
