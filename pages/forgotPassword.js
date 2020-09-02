import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

export default function forgotPassword() {
  const classes = useStyles();
  return (
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" size="large" color="primary" fullWidth>
              OK
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
