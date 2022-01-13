import { createStyles, makeStyles } from "@mui/styles";

export default makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: "black",
      position: "relative",
    },
    submenu: {
      flexGrow: 1,
      textAlign: "center",
      color: "white",
    },
    logo: {
      maxWidth: 250,
      marginRight: "-100px",
      marginTop: "15px",
    },
    Container: {
      border: "1px solid grey",
    },
    subAppBar: {
      backgroundColor: "#787878",
      marginTop: "7px",
    },
    card: {
      width: "250px",
      height: "250px",
      position: "relative",
      right: "-1250px",
      top: "-350px",
      border: "1px solid grey",
    },
    cardtitle: {
      width: "250px",
      height: "40px",
      borderBottom: "1px solid grey",
      backgroundColor: "#f4f3ef",
    },
    titleText: {
      textAlign: "justify",
      marginRight: "10px",
      letterSpacing: "1px",
    },
  })
);
