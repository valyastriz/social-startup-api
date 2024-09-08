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