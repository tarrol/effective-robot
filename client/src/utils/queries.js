import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
    }
  }
`;

export const QUERY_LIST = gql`
  query list($_id: String) {
    list(_id: $_id) {
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

export const QUERY_REWARD = gql`
  query reward($_id: String) {
    reward(_id: $_id) {
      _id
      name
      cost
    }
  }
`;

