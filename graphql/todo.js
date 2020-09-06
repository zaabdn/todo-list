import gql from "graphql-tag";

const GET_TODO = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`;

export default GET_TODO;
