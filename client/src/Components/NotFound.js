import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import notfoundlogo from "../images/notfoundlogo.png";
import bg from "../images/bg.jpg";

const useStyles = makeStyles({
  imgBackground: {
    position: "fixed",
    width: "100%",
    height: "100%",
    filter: "blur(2px)",
  },
});

const NotFound = () => {
  const classes = useStyles();

  return (
    <div>
      <img className={classes.imgBackground} src={bg} />
      <Box
        style={{
          position: "absolute",
          width: "50%",
          height: "65%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(240,240,240,.66)",
          borderRadius: "4px",
        }}
      >
        <div style={{ alignItems: "center", justifyContent: "center", display: "flex", marginTop: "100px" }}>
          <a href="/">
            <img src={notfoundlogo} alt="notfoundlogo" />
          </a>
        </div>
        <Box style={{ marginTop: "70px", textAlign: "center" }}>
          <Typography variant="h4" style={{ color: "black", fontWeight: "bold" }}>
            Dear customer you've probably ended up wrong
            <br />
            <br />
            Error code 404 - Not Found
          </Typography>
          <Typography style={{ alignItems: "center", justifyContent: "center", display: "flex", marginTop: "80px" }}>
            <Button style={{ backgroundColor: "white", color: "black", fontWeight: "bold", width: "300px", height: "50px" }} variant="contained" to="/" component={Link}>
              Webrel Homepage
            </Button>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default NotFound;
