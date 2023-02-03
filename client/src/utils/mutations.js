import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
mutation Register($email: String!, $password: String!, $name: String!) {
  register(email: $email, password: $password, name: $name) {
    user {
      name
      password
      email
      profiles {
        name
      }
      _id
    }
    token
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const CREATE_PROFILE = gql`
mutation CreateProfile($id: String!, $name: String!) {
  createProfile(_id: $id, name: $name) {
    _id
    name
    profiles {
      isAdmin
      name
    }
  }
}
`;

export const SET_PIN = gql`
  mutation setPin($_id: String!, $name: String!) {
    setPin(_id: $_id, name: $name) {
      _id
      pin
    }
  }
`
export const SET_ADMIN = gql`
mutation SetAdmin($id: String!, $name: String!) {
  setAdmin(_id: $id, name: $name) {
    _id
    profiles {
      name
      isAdmin
    }
  }
}
`