const { Chore, List } = require("./Chore.js");

module.exports = {
  User: require("./User.js"),
  Chore,
  List,
  Reward: require("./Reward.js")
};

/*
  TODO: 
    1. Admin and User creation / login
    2. Chore Model
      name
      description
      reward-points
    3. List Model
      name
      Date of week?
      array of Chores
    4. Reward Currency Model
      name
      theme
    5. Reward Model
      Name
      cost
*/