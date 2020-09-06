import gql from "graphql-tag";

const DELETE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    deleteTodo(id: $id) {
      title
      completed
    }
  }
`;

export default DELETE_TODO;
