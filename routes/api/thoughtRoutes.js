const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

// GET all thought and POST a new thought
router.route('/')
    .get(getThoughts)
    .post(createThought);

// GET a single thought, PUT to update a thought, DELETE to remove a thought
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;