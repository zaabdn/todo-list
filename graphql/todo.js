import gql from "graphql-tag";

export const GET_TODO = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`;

export const CREATE_TODO = gql`
  mutation create($title: String, $completed: Boolean = false) {
    createTodo(input: { title: $title, completed: $completed }) {
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation update($id: String!, $completed: Boolean) {
    updateTodo(input: { completed: $completed }, id: $id) {
      title
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    deleteTodo(id: $id) {
      title
      completed
    }
  }
`;
