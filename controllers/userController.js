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
        if (!results.isEmpty()) return res.json({ error: results.errors });

        // check if passwords match
        if (req.body.password !== req.body.confirm_password) {
            return res.json({ errors: [{ msg: 'Password did not match' }] });
        }

        // check if username already exists
        User.find({ username: req.body.username }, (err, usersFound) => {
            if (err) return next(err);

            if (usersFound.length) {
                res.json({ user: user, msg: 'username taken', numberFound: usersFound.length });
            } else {
                // All checks complete hash password and save user
                bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                    if (err) return next(err);

                    user.password = hashedPassword;

                    // Save user to database
                    user.save(err => {
                        if (err) return next(err);
                        res.status(200)
                        res.json({ msg: 'user saved' })
                    })
                })
            }
        })
    }
]

// GET - FETCH USER DATA: fetch user data to be edited 
exports.get_user = (req, res) => {
    res.json({ message: 'NOT YET IMPLEMENTED: Fetch user details' });
}

// PUT - UPDATE USER: update user info
exports.put_user = (req, res) => {
    res.json({ message: 'NOT YET IMPLEMENTED: update user details' });
}

// DELETE : Delete user from database
exports.delete_user = (req, res) => {
    res.json({ message: 'NOT YET IMPLEMENTED: update user details' });
}