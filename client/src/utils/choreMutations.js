import { gql } from "@apollo/client";

export const CREATE_CHORE = gql`
mutation CreateChore($id: String!, $name: String!, $description: String, $points: String, $flavorText: String) {
  createChore(_id: $id, name: $name, description: $description, points: $points, flavorText: $flavorText) {
    _id
    chores {
      _id
      description
      name
      points
      flavorText
      isComplete
    }
  }
}
`;

export const UPDATE_CHORE = gql`
mutation UpdateChore($id: String!, $idChore: String!, $name: String!, $description: String!, $points: String!, $flavorText: String!, $isComplete: Boolean!) {
  updateChore(_id: $id, _idChore: $idChore, name: $name, description: $description, points: $points, flavorText: $flavorText, isComplete: $isComplete) {
    chores {
      _id
      description
      name
      points
      flavorText
      isComplete
    }
  }
}
`;

export const DELETE_CHORE = gql`
mutation DeleteChore($id: String!, $idChore: String!) {
  deleteChore(_id: $id, _idChore: $idChore) {
    _id
    chores {
      _id
      description
      name
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