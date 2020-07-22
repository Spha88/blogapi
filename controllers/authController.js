const jwt = require('jsonwebtoken');
const passport = require('passport');

/** POST login */
exports.auth_login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ message: 'username or password incorrect' });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            const userDetails = { // Send user details to client (not sensitive data)
                first_name: user.first_name,
                last_name: user.last_name,
                bio: user.bio,
                imageUrl: user.imageUrl,
                _id: user._id,
                username: user.username
            }

            const payload = { // store these details of the user in the token
                username: user.username,
                id: user._id
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(payload, process.env.PASSPORT_SECRET, { expiresIn: '10h' });
            return res.json({ token, user: userDetails });
        });
    })(req, res);
}

exports.auth_logout = (req, res) => {
    res.json({ message: 'I Will implement this on the client then later on the DB' });
}