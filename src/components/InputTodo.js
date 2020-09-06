import {
  InputBase,
  Grid,
  InputAdornment,
  IconButton,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleRounded from "@material-ui/icons/AddCircleRounded";

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
    padding: "8px 0",
    borderRadius: "5px",
    width: "100%",
  },
}));

const InputTodo = ({ todos, handleChange, handleSubmit }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputBase
          startAdornment={
            <InputAdornment>
              <IconButton>
                <AddCircleRounded style={{ color: "#bababa" }} />{" "}
              </IconButton>
            </InputAdornment>
          }
          className={classes.input}
          placeholder="Add a Task"
          onChange={(e) => handleChange(e)}
          name="title"
          inputRef={(node) => {
            todos.title = node;
          }}
        />
      </form>
    </Grid>
  );
};

export default InputTodo;
