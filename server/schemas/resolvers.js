const { AuthenticationError } = require("apollo-server-express");
const { User, List, Reward, Chore } = require("../models");
const { signToken } = require("../utils/auth.js");
const { callGPT } = require("../utils/gpt.js");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // lists by list id
    list: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return await List.find(params);
    },
    // lists by user id
    myLists: async (parent, { _id }) => {
      return await List.find({admin: _id});
    },
    // lists by user id
    reward: async (parent, { _id }) => {
      return await Reward.find({admin: _id});
    },
    // data.getAdmin.profiles.name to get name of admin
    getAdmin: async (parent, { _id }) => {
      return await User.findOne(
        { _id: _id, "profiles.isAdmin": true }, 
        { "profiles.$": 1 }
      );
    }
  },
  Mutation: {
    // tested: works
    register: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      user.profiles.push({
        name: name,
        isAdmin: true,
        points: "0"
      });
      const token = signToken(user);
      return { token, user };
    },
    // tested: works
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
    // tested: works
    createProfile: async (parent, { _id, name }) => {
      const user = await User.findByIdAndUpdate(
        { _id },
        { $push: { profiles: { name: name, isAdmin: false, points: "0" } } },
        { new: true }
      );
      return user;
    },
    // tested: works
    setPin: async (parent, { _id, pin }) => {
      const user = await User.findByIdAndUpdate(
        { _id },
        { pin: pin },
        { new: true }
      );
      return user;
    },
    // tested: works
    setAdmin: async (parent, { _id, name }) => {
      await User.findOneAndUpdate(
        { _id: _id, "profiles.isAdmin" : true },
        { $set: {
          "profiles.$.isAdmin" : false
        } },
        { new: true }
      );
      const user = await User.findOneAndUpdate(
        { _id: _id, "profiles.name": name },
        { $set: {
          "profiles.$.isAdmin" : true
        }},
        { new: true }
      );
      return user;
    },
    updateProfilePoints: async (parent, {_id, name, points}) => {
      const pointUser = await User.findOne(
        { _id: _id, "profiles.name": name }, 
        { "profiles.$": 1 }
      );
      let pointInt = parseInt(pointUser.profiles[0].points);
      let newPoints = pointInt + parseInt(points);
      const user = User.findOneAndUpdate(
        { _id: _id, "profiles.name": name},
        { $set: {
          "profiles.$.points": newPoints
        } },
        { new: true }
      );
      return user;
    },

    // Chore Mutations
    //tested: works
    createChore: async (parent, { _id, name, description, points, flavorText, theme }) => {
      const _flavor = await callGPT(name, theme);
      const chore = await Chore.create({
        name: name,
        description: description,
        points: points,
        listId: _id,
        flavorText: _flavor,
        isComplete: false
      });
      const list = await List.findByIdAndUpdate(
        { _id },
        { $push: { chores: chore } },
        { new: true }
      );
      return list;
    },
    // tested: works
    updateChore: async (parent, { _id, _idChore, name, description, points, flavorText, isComplete }) => {
      const chore = await Chore.findOneAndUpdate(
        { _id: _idChore },
        { name: name, description: description, points: points, flavorText: flavorText, isComplete: isComplete },
        { new: true }
      );
      const list = await List.findOneAndUpdate(
        { _id: _id, "chores._id": _idChore },
        { $set: {
          "chores.$.name": name,
          "chores.$.description" : description,
          "chores.$.points": points,
          "chores.$.flavorText": flavorText,
          "chores.$.isComplete": isComplete
        } },
        { new: true }
      )
      return list;
    },
    // tested: works
    deleteChore: async (parent, { _id, _idChore }) => {
      const list = await List.findByIdAndUpdate(
        { _id },
        { $pull: { chores: { _id: _idChore } } },
        { new: true }
      );
      await Chore.findOneAndDelete({ _id: _idChore });
      return list;
    },
    // tested: works
    createList: async (parent, { _idAdmin, name, theme }) => {
      const list = await List.create({
        name: name,
        chores: [],
        admin: _idAdmin,
        theme: theme
      });
      return list;
    },
    // tested: works
    deleteList: async (parent, { _id }) => {
      const list = await List.findOneAndDelete({ _id: _id });
      await Chore.deleteMany({listId: _id});
      return list;
    },

    // Reward Mutations
    // tested: works
    createReward: async (parent, { _idAdmin, name, cost }) => {
      const reward = await Reward.create({
        name: name,
        cost: cost,
        admin: _idAdmin,
      });
      return reward;
    },
    // tested: works
    updateReward: async (parent, { _id, name, cost }) => {
      const reward = await Reward.findByIdAndUpdate(
        { _id },
        { name: name, cost: cost },
        { new: true }
      );
      return reward;
    },
    // tested: works
    deleteReward: async (parent, { _id }) => {
      const reward = await Reward.findOneAndDelete({ _id: _id });
      return reward;
    },
  },

};

module.exports = resolvers;
