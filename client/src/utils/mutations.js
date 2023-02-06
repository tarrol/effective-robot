import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
mutation register($email: String!, $password: String!, $name: String!) {
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
      points
    }
  }
}
`;

export const SET_PIN = gql`
mutation SetPin($id: String!, $pin: String!) {
  setPin(_id: $id, pin: $pin) {
    _id
    email
    name
    password
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

export const UPDATE_PROFILE_POINTS = gql`
mutation UpdateProfilePoints($id: String!, $name: String!, $points: String!) {
  updateProfilePoints(_id: $id, name: $name, points: $points) {
    _id
    profiles {
      name
      points
    }
  }
}
`;