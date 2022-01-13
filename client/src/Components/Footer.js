import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "130px",
        backgroundColor: "rgba(0,0,0,.75)",
      }}
    >
      <div>
        <Typography style={{ color: "white", position: "fixed", left: "0", fontWeight: "bold", marginLeft: "100px", marginTop: "10px" }}>
          Need help?
          <Typography style={{ color: "white", marginTop: "6px" }}>
            <a href="mailto:info@hydroware.se?subject=WebRel Support" style={{ color: "inherit", textDecoration: "none" }}>
              info@hydroware.se
            </a>
            <br />
            <a href="mailto:it@hydroware.se?subject=WebRel Support" style={{ color: "inherit", textDecoration: "none" }}>
              it@hydroware.se
            </a>
          </Typography>
        </Typography>
      </div>

      <div style={{ color: "white", position: "fixed", right: "0", marginRight: "100px", marginTop: "25px" }}>
        <Typography>
          <Link href="https://www.instagram.com/hydroware/" color="inherit" target="_blank">
            <InstagramIcon style={{ fontSize: "65px" }} />
          </Link>

          <Link href="https://www.facebook.com/Hydroware-AB-1625316897716003/?rf=191407607575295" color="inherit" target="_blank">
            <FacebookIcon style={{ fontSize: "65px" }} />
          </Link>

          <Link href="https://se.linkedin.com/company/hydroware" color="inherit" target="_blank">
            <LinkedInIcon style={{ fontSize: "65px" }} />
          </Link>
        </Typography>
      </div>
    </Box>
  );
}
