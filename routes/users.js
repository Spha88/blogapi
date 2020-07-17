const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');


/** I don't need a list of users for now */

// POST - CREATE USER - /user
router.post('/', userController.post_user);

// GET - GET USER - /user/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), userController.get_user);

// PUT - UPDATE USER - /user/:id
router.put('/:id/update', passport.authenticate('jwt', { session: false }), userController.put_user);

// DELETE - DELETE USER - /user/:id/delete
router.delete('/:id/delete', passport.authenticate('jwt', { session: false }), userController.delete_user);

module.exports = router;
