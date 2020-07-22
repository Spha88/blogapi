const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const User = require('../models/userModel');

// POST - CREATE USER
exports.post_user = [
    // Validate fields
    body('first_name', 'First name must not be empty').trim().isLength({ min: 1 }),
    body('last_name', 'Last name must not be empty').trim().isLength({ min: 1 }),
    body('username', 'Username must not be empty').trim().isLength({ min: 1 }),
    body('password', 'password must not be empty').trim().isLength({ min: 1 }),
    body('confirm_password', 'Enter password again to confirm').trim().isLength({ min: 1 }),

    // Sanitize
    body('*').escape(),

    // Process request
    (req, res, next) => {
        // create user
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
        })

        const results = validationResult(req);

        // check validation errors
        if (!results.isEmpty()) return res.json({ errors: results.errors });

        // check if passwords match
        if (req.body.password !== req.body.confirm_password) {
            return res.json({ errors: [{ msg: 'Password did not match' }] });
        }

        // check if username already exists
        User.find({ username: req.body.username }, (err, usersFound) => {
            if (err) return next(err);

            if (usersFound.length) {
                res.status(400).json({ message: 'Username taken.' });

            } else {
                // All checks complete hash password and save user
                bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                    if (err) return next(err);

                    user.password = hashedPassword;

                    // Save user to database
                    user.save(err => {
                        if (err) return next(err);
                        res.status(200)
                        res.json({ message: 'User saved.' })
                    })
                })
            }
        })
    }
]

// GET - FETCH USER DATA: fetch user data to be edited 
exports.get_user = (req, res) => {
    User.findById(req.user.id, 'first_name last_name username imageUrl bio createdOn', (err, user) => {
        if (err) return next(err);
        res.json({ user: user });
    })
}

// PUT - UPDATE USER: update user info
exports.put_user = [
    // Validate fields
    body('first_name', 'First name must not be empty').trim().isLength({ min: 1 }),
    body('last_name', 'Last name must not be empty').trim().isLength({ min: 1 }),
    body('username', 'Username must not be empty').trim().isLength({ min: 1 }),
    body('imageUrl', 'Enter an image url').trim().isLength({ min: 1 }),
    body('bio', 'bio should not be empty').trim().isLength({ min: 1 }),

    // Sanitize
    body('first_name').escape(),
    body('last_name').escape(),
    body('username').escape(),
    body('bio').escape(),

    // Process request
    (req, res, next) => {
        // create user
        const user = new User({
            _id: req.params.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            imageUrl: req.body.imageUrl,
            bio: req.body.bio
        })

        const results = validationResult(req);

        // check validation errors
        if (!results.isEmpty()) return res.json({ error: results.errors });


        // find user and update
        User.findByIdAndUpdate(req.params.id, user, { new: true, select: '-password' }, (err, user) => {
            if (err) return next(err);
            if (user) {
                res.status(200).json({ message: 'User updated', user: user })
            } else {
                res.status(400).json({ message: 'User not saved' });
            }
        })

    }
]

// DELETE : Delete user from database
exports.delete_user = (req, res) => {
    if (req.params.id == req.user.id) { //Only allow user to delete own account
        User.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err) {
                res.status(400).json({ message: 'Error occurred, cannot delete.' })
            } else {
                res.status(200).json({ message: 'Account Removed' })
            }
        })
    } else {
        res.status(400).json({ message: 'Error occurred' });
    }
}