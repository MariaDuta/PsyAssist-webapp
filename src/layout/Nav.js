import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase";

const navs = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/questionnaire",
    name: "Questionnaire",
  },
  {
    path: "/progress",
    name: "Progress",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    display: "flex",
    listStyleType: "none",
  },
  link: {
    textDecoration: "none",
    marginRight: 10,
  },
  visited: {
    color: "#b39ddb",
  },
}));

const Nav = ({ userEmail }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <ul className={classes.list}>
              {navs.map((navItem) => (
                <li key={navItem.name} className={classes.link}>
                  <NavLink
                    exact
                    to={navItem.path}
                    activeClassName={classes.visited}
                  >
                    {navItem.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Typography>
          <div className={classes.link}>
            <Typography variant="h6" className={classes.title}>
              {userEmail ? (
                userEmail
              ) : (
                <NavLink exact to="/login" activeClassName={classes.visited}>
                  Login
                </NavLink>
              )}
              {userEmail && (
                <Button
                  style={{ marginLeft: 20 }}
                  variant="contained"
                  type="submit"
                  onClick={async () => await auth.signOut()}
                >
                  Logout
                </Button>
              )}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
