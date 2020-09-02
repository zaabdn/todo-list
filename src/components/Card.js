import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import {
  InputBase,
  Container,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import GET_TODO from "../../graphql/todo";
import { useQuery } from "@apollo/client";

const GreenCheckbox = withStyles({
  root: {
    color: "grey",
    "&$checked": {
      color: "green",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 800,
    marginTop: "100px",
  },
  input: {
    marginTop: "20px",
    flex: 1,
    border: 0,
    backgroundColor: "#ededed",
    padding: "8px 10px",
    borderRadius: "5px",
    width: "550px",
  },
  delete: {
    marginTop: "10px",
    color: "#d93232",
    float: "right",
  },
  Typography: {
    fontWeight: "bold",
  },
  FormControlLabel: {
    borderRadius: "50%",
    width: "1000px",
  },
}));

export default function Card() {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: false,
  });

  const { loading, error, data } = useQuery(GET_TODO);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const classes = useStyles();
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <img
            src="https://next-todo-jecqt.art.mejik.id/images/art.svg"
            alt="logo"
            width="150px"
            height="150px"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" align="center">
            Let's do
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" color="textSecondary">
            Coding, Eat, Sleep, Repeat
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <InputBase className={classes.input} placeholder="Add a Task" />
        </Grid>
        {data &&
          data.todos.map((todo) => (
            <Grid key={todo.id} item xs={12}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    onChange={handleChange}
                    name={todo.id}
                    id={todo.id}
                  />
                }
              />
              {todo.title}
              <DeleteIcon className={classes.delete} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
