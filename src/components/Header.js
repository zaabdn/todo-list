import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  CssBaseline,
  Grid,
} from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

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
  Button: {
    color: "white",
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    cursor: "pointer",
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    cursor: "pointer",
  },
}));

export default function Header() {
  const classes = useStyles();
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  function handleLogout() {
    localStorage.clear();
    Cookies.remove("token");
    window.location.reload(true);
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="h5">TODO</Typography>
          </Grid>
          {token ? (
            <Grid item xs={4} align="right">
              <Button onClick={handleLogout} type="submit">
                Logout
              </Button>
            </Grid>
          ) : (
            <Grid item xs={4} align="right">
              <Link href="/signin" as={`/signin`}>
                <Button
                  variant="contained"
                  size="small"
                  style={{ marginRight: "10px" }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup" as={`/signup`}>
                <Button variant="contained" color="primary" size="small">
                  Sign up
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </React.Fragment>
  );
}
