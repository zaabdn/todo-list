import gql from "graphql-tag";

const CREATE_TODO = gql`
  mutation create($title: String, $completed: Boolean = false) {
    createTodo(input: { title: $title, completed: $completed }) {
      title
      completed
    }
  }
`;

export default CREATE_TODO;
