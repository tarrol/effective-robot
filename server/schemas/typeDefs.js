const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type profileSchema {
    name: String!
    isAdmin: Boolean!
    points: String
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
    points: String
    flavorText: String
    listId: ID
    isComplete: Boolean
  }

  type List {
    _id: ID!
    name: String!
    chores: [Chore]!
    admin: ID
    theme: String
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
    getAdmin(_id: String!): User
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
    updateProfilePoints(_id: String!, name: String!, points: String!): User

    createChore(_id: String!, name: String!, description: String, points: String, flavorText: String, theme: String): List
    updateChore(_id: String!, _idChore: String!, name: String!, description: String!, points: String!, flavorText: String!, isComplete: Boolean!): List
    deleteChore(_id: String!, _idChore: String!): List
    
    createList(_idAdmin: String!, name: String!, theme: String!): List
    deleteList(_id: String!): List
    
    createReward(_idAdmin: String!, name: String!, cost: Int): Reward
    updateReward(_id: String!, name: String!, cost: Int!): Reward
    deleteReward(_id: String!): Reward
  }

`;

module.exports = typeDefs;
