import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  CssBaseline,
  Grid,
  FormGroup,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "black",
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
  const [email, setEmail] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    localStorage.clear();
    Cookies.remove("token");
    router.push(`/signin`);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "transparent" }}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <b>Todo List</b>
          </Typography>
          {email ? (
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <AccountCircle />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Grid>
              <Link href="/signin">
                <Button
                  variant="text"
                  color="inherit"
                  style={{ marginRight: "20px", color: "black" }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="contained">Register</Button>
              </Link>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
