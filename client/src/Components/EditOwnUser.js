import React, { useState, useEffect, useRef, useContext } from "react";
import { FormGroup, FormControl, InputLabel, Input, Button, Typography, Box, Switch, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
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
  const { user, password, setUser } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);
  const classes = useStyles();
  let navigate = useNavigate();

  useEffect(() => {
    getUsersID();
    getUsersUsername();
  }, []);

  const getUsersID = async () => {
    const response = await UserService.getUserById(user._id);
    setUserEdit(response);
  };

  const getUsersUsername = async () => {
    const res = await UserService.getUsernameById(user._id);
    setYourUser(res);
  };

  const [yourUser, setYourUser] = useState({ username: "" });

  const editUserDetails = () => {
    AuthService.login(user).then((data) => {
      const { isAuthenticated } = data;
      if (isAuthenticated) {
        UserService.updateUsers(userEdit).then((data) => {
          const { message } = data;
          user.username = userEdit.username;
          userEdit.password = "";
          user.password = "";
          setMessage(message);
        });
      } else {
        setWrongpassw(true);
      }
    });
  };

  const onValueChange = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
    setYourUser({ ...yourUser, [e.target.name]: e.target.value });
    setMessage(null);
  };

  const [wrongpassw, setWrongpassw] = useState(false);

  const onChangeOldPassw = (e) => {
    if (password !== "") {
      setWrongpassw(false);
      setMessage(null);
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
    <form>
      {/* {console.log(yourUser.username)} */}
      {/* {console.log(user)} */}
      {/* {console.log(userEdit.password)} */}
      {console.log(user.password)}
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
          <Input onChange={(e) => onValueChange(e)} value={userEdit.password} name="password" type="password" aria-describedby="my-helper-text" />
        </FormControl>
        <br />
        <FormControl variant="standard">
          <InputLabel htmlFor="my-input">Current Password</InputLabel>
          <Input onChange={(e) => onChangeOldPassw(e)} error={wrongpassw} name="password" type="password" value={password} />
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
    </form>
  );
};

export default EditOwnUser;
