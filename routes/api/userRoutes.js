// combines user and thought routes

const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

const {
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// Add a friend to a user's friend list and remove a friend
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

// GET all users and POST a new user
router.route('/')
    .get(getUsers)
    .post(createUser);

// GET a single user, PUT to update a user and DELETE to remove a user
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;