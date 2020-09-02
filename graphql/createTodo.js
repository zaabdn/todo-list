import gql from "graphql-tag";

const CREATE_TODO = gql`
  mutation createTodo($title: String, $status: String) {
    login(input: { title: $title, status: $status }) {
      title
      status
      }
    }
  }
`;

export default CREATE_TODO;
