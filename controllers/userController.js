const User = require('../models/User');
const Thought = require('../models/Thought');

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

// get single user by ID
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends');
        
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// create a new user
const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

// update a user by ID
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(updatedUser);
    }   catch (err) {
        res.status(500).json(err);
    }
};

// delete a user and their associated thoughts
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        // remove user's associated thoughts
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Add a friend to a user's friend list
const addFriend = async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },  // Use $addToSet to avoid duplicates
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // Remove a friend from a user's friend list
  const removeFriend = async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },  // Use $pull to remove a friend
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  };
