import gql from "graphql-tag";

const UPDATE_TODO = gql`
  mutation update($id: String!, $completed: Boolean) {
    updateTodo(input: { completed: $completed }, id: $id) {
      title
      completed
    }
  }
`;

export default UPDATE_TODO;
