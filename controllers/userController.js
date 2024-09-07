const { User, Thought } = require('../models');

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

