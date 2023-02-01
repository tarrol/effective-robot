const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Chore {
    _id: ID!
    name: String!
    description: String
    points: Int
  }

  type List {
    _id: ID!
    name: String!
    chores: [Chore]!
  }

  type Reward {
    _id: ID!
    name: String!
    cost: Int
  }

  type Query {
    me: User
    list(_id: String): [List] 
    reward(_id: String): [Reward]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }

  type ChoreMutation {
    createChore(_id: String!, name: String!, description: String, points: Int): List
    updateChore(_id: String!, name: String, description: String, points: Int): List
    deleteChore(_id: String!, _idChore: String!): List
    createList(name: String!)
    deleteList(_id: String!)
  }
`;

module.exports = typeDefs;
