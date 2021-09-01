import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

const Footer = () => (
  <AppBar position="static" color="primary">
    <Container maxWidth="md">
      <Toolbar
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1" color="inherit" align="center">
          Mental Health Dashboard
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Footer;
