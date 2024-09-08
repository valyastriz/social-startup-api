const { Thought, User } = require('../models');

// get all thoughts
const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// get a single thought by id
const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};


// create a new thought
const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);

        //add the thought to teh associated user's thoughts array
        await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: newThought._id } },
            { new: true }
        );

        res.json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// update a thought by id
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

