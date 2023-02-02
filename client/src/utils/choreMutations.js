import { gql } from "@apollo/client";

export const CREATE_CHORE = gql`
  mutation createChore(
    $_id: String!,
    $name: String!,
    $description: String,
    $points: Int
  ) {
    createChore(
      _id: $_id,
      name: $name,
      description: $description,
      points: $points
    ) {
      _id
      name
      chores {
        _id
        name
        description
        points
      }
    }
  }
`;

export const UPDATE_CHORE = gql`
  mutation updateChore(
    $_id: String!,
    $name: String!,
    $description: String!,
    $points: Int!
  ) {
    updateChore(
      _id: $_id,
      name: $name,
      description: $description,
      points: $points
    ) {
      _id
      name
      description
      points
    }
  }
`;

export const DELETE_CHORE = gql`
  mutation deleteChore(
    $_id: String!,
    $_idChore: String!
  ) {
    deleteChore(
      _id: $_id,
      _idChore: $_idChore
    ) {
      _id
      name
      chores {
        id
        name
        description
        points
      }
    }
  }
`;

export const CREATE_LIST = gql`
  mutation createList($_idAdmin: String!, $name: String!) {
    createList(_idAdmin: $_idAdmin, name: $name) {
      _id 
      name
    }
  }
`;

export const DELETE_LIST = gql`
  mutation deleteList($_id: String!) {
    deleteList(_id: $_id) {
      _id
    }
  }
`;