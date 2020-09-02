import gql from "graphql-tag";

const SIGNUP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: EmailAddress!
    $password: String!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export default SIGNUP;
