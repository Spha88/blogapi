const passportJTW = require('passport-jwt');
const User = require('../models/userModel');
const JWTStrategy = passportJTW.Strategy;
const ExtractJWT = passportJTW.ExtractJwt

/**
 * This strategy is used in the auth middlewares,
 * 1. it extracts the JWT from the req authorization header
 * 2. and uses the secret key to decrypt it
 * 
 */
const passportJWTStrategy = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET
},
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        // return User.findById(jwtPayload.id)
        //     .then(user => {
        //         return cb(null, user);
        //     })
        //     .catch(err => {
        //         return cb(err);
        //     });
        return cb(null, jwtPayload);
    }
)

module.exports = passportJWTStrategy;