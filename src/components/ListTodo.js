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
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
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

const ListTodo = ({ data, handleDelete, handleChangeCheck, handleUpdate }) => {
  const classes = useStyles();
  return (
    <>
      {data &&
        data.todos.map((todo) => (
          <Grid key={todo.id} item xs={12}>
            {todo.completed == true ? (
              <Checkbox
                onChange={handleChangeCheck}
                name="completed"
                id={todo.id}
                checked
                icon={<CircleUnchecked />}
                checkedIcon={<CircleCheckedFilled style={{ color: "green" }} />}
                onClick={(e, completed = false) => {
                  handleUpdate(todo.id, e, completed);
                }}
              />
            ) : (
              <Checkbox
                onChange={handleChangeCheck}
                name="completed"
                id={todo.id}
                icon={<CircleUnchecked style={{ color: "#bababa" }} />}
                checkedIcon={<CircleCheckedFilled style={{ color: "green" }} />}
                onClick={(e, completed = true) => {
                  handleUpdate(todo.id, e, completed);
                }}
              />
            )}

            {todo.title}
            <DeleteIcon
              onClick={(e) => {
                handleDelete(todo.id, e);
              }}
              className={classes.delete}
            />
          </Grid>
        ))}
    </>
  );
};

export default ListTodo;
