import gql from "graphql-tag";

const SIGNIN = gql`
  mutation SignIn($email: EmailAddress!, $password: String!) {
    login(input: { email: $email, password: $password }) {
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

export default SIGNIN;
