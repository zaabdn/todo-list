import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Checkbox,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleRounded from "@material-ui/icons/AddCircleRounded";
import GET_TODO from "../../graphql/todo";
import { useQuery } from "@apollo/client";
import CREATE_TODO from "../../graphql/createTodo";
import UPDATE_TODO from "../../graphql/updateTodo";
import DELETE_TODO from "../../graphql/deleteTodo";
import { useMutation, gql } from "@apollo/client";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

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
    padding: "14px 0 14px 10px",
    borderRadius: "5px",
    width: "100%",
  },
  delete: {
    marginTop: "10px",
    color: "#d93232",
    float: "right",
    cursor: "pointer",
  },
  Typography: {
    fontWeight: "bold",
  },
}));

export default function Card(props) {
  let input;
  const router = useRouter();
  const [todos, setTodo] = useState({
    title: "",
    completed: false,
  });

  const { loading, error, data, refetch } = useQuery(GET_TODO);

  const handleChange = (event) => {
    setTodo({ ...todos, [event.target.name]: event.target.checked });
  };

  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: () => {
      refetch();
    },
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    onCompleted: () => {
      refetch();
    },
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => {
      refetch();
    },
  });

  const classes = useStyles();
  return (
    <Container
      maxWidth="sm"
      style={{ marginTop: "50px", paddingBottom: "100px" }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <img
            src="https://media-exp1.licdn.com/dms/image/C4D0BAQGrzneL3Dpmxw/company-logo_200_200/0?e=2159024400&v=beta&t=145tUYuZya2-FCl7P369j8wX6QAhnLt-gzSOuHVizvg"
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createTodo({ variables: { title: input.value } });
              input.value = "";
            }}
          >
            <input
              // startAdornment={
              //   <InputAdornment>
              //     <IconButton>
              //       <AddCircleRounded />{" "}
              //     </IconButton>
              //   </InputAdornment>
              // }
              type="text"
              className={classes.input}
              placeholder="Add a Task"
              onChange={(e) => setTodo(e.target.value)}
              name="title"
              ref={(node) => {
                input = node;
              }}
            />
          </form>
        </Grid>
        {data &&
          data.todos.map((todo) => (
            <Grid key={todo.id} item xs={12}>
              {todo.completed == true ? (
                <Checkbox
                  onChange={handleChange}
                  name="completed"
                  id={todo.id}
                  checked
                  icon={<CircleUnchecked />}
                  checkedIcon={
                    <CircleCheckedFilled style={{ color: "green" }} />
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    updateTodo({
                      variables: { id: todo.id, completed: false },
                    });
                  }}
                />
              ) : (
                <Checkbox
                  onChange={handleChange}
                  name="completed"
                  id={todo.id}
                  icon={<CircleUnchecked style={{ color: "#bababa" }} />}
                  checkedIcon={
                    <CircleCheckedFilled style={{ color: "green" }} />
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    updateTodo({
                      variables: { id: todo.id, completed: true },
                    });
                  }}
                />
              )}

              {todo.title}
              <DeleteIcon
                onClick={(e) => {
                  e.preventDefault();
                  deleteTodo({ variables: { id: todo.id } });
                }}
                className={classes.delete}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
