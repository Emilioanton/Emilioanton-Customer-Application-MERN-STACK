import React from "react";
import Alert from "@mui/material/Alert";

const getStyle = (props) => {
  if (props.message.msgError) {
    return "error";
  } else {
    return "success";
  }
};

const Message = (props) => {
  return <Alert severity={getStyle(props)}>{props.message.msgBody}</Alert>;
};

export default Message;
