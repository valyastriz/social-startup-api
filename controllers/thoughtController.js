const User = require('../models/User');
const Thought = require('../models/Thought');

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

// delete a thought by ID
const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID '});
        }

        // remove thought from user's thought array
        await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );

        res.json({ message: 'Thought deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
};

// add a reaction to a thought
const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },  // Adds the reaction to the reactions array
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// remove a reaction by reactionId
const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },  // Removes the reaction with the matching reactionId
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { 
    getThoughts, 
    getSingleThought, 
    createThought, 
    updateThought, 
    deleteThought, 
    addReaction,
    removeReaction
};