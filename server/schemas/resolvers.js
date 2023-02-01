const { AuthenticationError } = require("apollo-server-express");
const { User, List, Reward, Chore } = require("../models");
const { signToken } = require("../utils/auth.js");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    list: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return List.find(params);
    },
    reward: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Reward.find(params);
    },
  },
  Mutation: {
    register: async (parent, { name, email, password, pin }) => {
      const user = await User.create({ name, email, password, pin });
      user.profiles.$push({
        name: name,
        isAdmin: true,
      });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    createProfile: async (parent, { _id, name }) => {
      const user = await User.findByIdAndUpdate(
        { _id },
        { $push: { profiles: { name: name, isAdmin: false } } },
        { new: true }
      );
      return user;
    },
  },
  ChoreMutation: {
    createChore: async (parent, { _id, name, description, points }) => {
      const chore = await Chore.create({
        name: name,
        description: description,
        points: points,
      });
      const list = await List.findByIdAndUpdate(
        { _id },
        { $push: { chores: chore } },
        { new: true }
      );
      return list;
    },
    updateChore: async (parent, { _id, name, description, points }) => {
      const chore = await Chore.findByIdAndUpdate(
        { _id },
        { name: name, description: description, points: points },
        { new: true }
      );
      return chore;
    },
    deleteChore: async (parent, { _id, _idChore }) => {
      const list = await List.findByIdAndUpdate(
        { _id },
        { $pull: { chores: { _id: _idChore } } },
        { new: true }
      );
      await Chore.findOneAndDelete({ _id: _idChore });
      return list;
    },
    createList: async (parent, { _idAdmin, name }) => {
      const list = await List.create({
        name: name,
        chores: [],
        admin: _idAdmin,
      });
      return list;
    },
    deleteList: async (parent, { _id }) => {
      const list = await List.findOneAndDelete({ _id: _id });
    },
  },
  RewardMutation: {
    createReward: async (parent, { _idAdmin, name, cost }) => {
      const reward = await Reward.create({
        name: name,
        cost: cost,
        admin: _idAdmin,
      });
      return reward;
    },
    updateReward: async (parent, { _id, name, cost }) => {
      const reward = await Reward.findByIdAndUpdate(
        { _id },
        { name: name, cost: cost },
        { new: true }
      );
      return reward;
    },
    deleteReward: async (parent, { _id }) => {
      await Reward.findOneAndDelete({ _id: _id });
    },
  },
};

module.exports = resolvers;
