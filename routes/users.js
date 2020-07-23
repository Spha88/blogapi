const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');


/** I don't need a list of users for now */

// POST - CREATE USER - /user
router.post('/', userController.post_user);

router.use(passport.authenticate('jwt', { session: false }));

// GET - GET USER - /user/:id
router.get('/:id', userController.get_user);

// PUT - UPDATE USER - /user/:id
router.put('/:id/update', userController.put_user);

// DELETE - DELETE USER - /user/:id/delete
router.delete('/:id/delete', userController.delete_user);

module.exports = router;
