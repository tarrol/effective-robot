import { gql } from "@apollo/client";

export const CREATE_REWARD = gql`
mutation CreateReward($idAdmin: String!, $name: String!, $cost: Int) {
    createReward(_idAdmin: $idAdmin, name: $name, cost: $cost) {
      _id
      name
      cost
    }
  }
`;

export const UPDATE_REWARD = gql`
mutation UpdateReward($id: String!, $name: String!, $cost: Int!) {
    updateReward(_id: $id, name: $name, cost: $cost) {
      _id
      cost
      name
    }
  }
`;

export const DELETE_REWARD = gql`
mutation DeleteReward($id: String!) {
    deleteReward(_id: $id) {
      _id
    }
  }
`;