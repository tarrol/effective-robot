import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      password
      pin
      profiles {
        name
        isAdmin
        points
      }
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
        flavorText
      }
    }
  }
`;

export const QUERY_MYLISTS = gql`
query MyLists($id: String!) {
  myLists(_id: $id) {
    _id
    name
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

export const QUERY_MYREWARDS = gql`
  query reward($_id: String) {
    reward(_id: $_id) {
      _id
      name
      cost
    }
  }
`;

export const QUERY_GETADMIN = gql`
query getAdmin($id: String!) {
  getAdmin(_id: $id) {
    profiles {
      isAdmin
      name
    }
  }
}
`;

