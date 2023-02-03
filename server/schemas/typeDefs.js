const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type profileSchema {
    name: String!
    isAdmin: Boolean!
  }
  type User {
    _id: ID
    name: String
    email: String
    password: String
    pin: String
    profiles: [profileSchema]
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
    listId: ID
  }

  type List {
    _id: ID!
    name: String!
    chores: [Chore]!
    admin: ID
  }

  type Reward {
    _id: ID!
    name: String!
    cost: Int
    admin: ID!
  }

  type Query {
    me: User
    list(_id: String): [List]
    myLists(_id: String!): [List]
    reward(_id: String!): [Reward]
  }

  type Mutation {
    register(
      name: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    createProfile(_id: String!, name: String!): User
    setPin(_id: String!, pin: String!): User
    setAdmin(_id: String!, name: String!): User

    createChore(_id: String!, name: String!, description: String, points: Int): List
    updateChore(_id: String!, _idChore: String!, name: String!, description: String!, points: Int!): List
    deleteChore(_id: String!, _idChore: String!): List
    
    createList(_idAdmin: String!, name: String!): List
    deleteList(_id: String!): List
    
    createReward(_idAdmin: String!, name: String!, cost: Int): Reward
    updateReward(_id: String!, name: String!, cost: Int!): Reward
    deleteReward(_id: String!): Reward
  }

`;

module.exports = typeDefs;
