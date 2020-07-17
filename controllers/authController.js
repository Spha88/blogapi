const jwt = require('jsonwebtoken');
const passport = require('passport');

/** POST login */
exports.auth_login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'username or password incorrect',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign({ username: user.username, id: user._id }, process.env.PASSPORT_SECRET);
            return res.json({ token });
        });
    })(req, res);
}

exports.auth_logout = (req, res) => {
    res.json({ message: 'This is will use passport local strategy once set up' })
}