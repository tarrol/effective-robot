const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type profileSchema {
    name: String!,
    isAdmin: Boolean!,
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
    register(name: String!, email: String!, password: String!, pin:String!): Auth
    login(email: String!, password: String!): Auth
    createProfile(_id: String!, name: String!): User
    updateProfile(_id: String!, )
    deleteProfile(_id: String!)
  }

  type ChoreMutation {
    createChore(_id: String!, name: String!, description: String, points: Int): List
    updateChore(_id: String!, name: String!, description: String!, points: Int!): Chore
    deleteChore(_id: String!, _idChore: String!): List
    createList(_idAdmin: String!, name: String!): List
    deleteList(_id: String!)
  }

  type RewardMutation {
    createReward(_idAdmin: String!, name: String!, cost: Int): Reward
    updateReward(_id: String!, name: String!, cost: Int!): Reward
    deleteReward:(_id: String!)
  }
`;

module.exports = typeDefs;
