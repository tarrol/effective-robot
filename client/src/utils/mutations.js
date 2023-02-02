import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
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
  mutation createProfile($_id: String!, $name: String!) {
    createProfile(_id: $_id, name: $name) {
      _id
      name
      email
      password
      profiles {
        name
        isAdmin
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
  mutation setAdmin($_id: String!, $name: String!) {
    setAdmin(_id: $_id, name: $name)
    _id
    profiles {
      name
      isAdmin
    }
  }
`