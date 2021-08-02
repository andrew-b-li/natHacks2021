const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;

// module.exports = (passport) => {
//   passport.use(
//     new JwtStrategy(opts, (jwt_payload, done) => {
//       User.findById(jwt_payload.id)
//         .then((user) => {
//           if (user) {
//             return done(null, user);
//           }
//           return done(null, false);
//         })
//         .catch((err) => console.log(err));
//     })
//   );
// };

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, cb) {
      //Assume there is a DB module pproviding a global UserModel
      return User.findOne({ email })
        .then((user) => {
          // Check password
          bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
              // User matched
              // // Create JWT Payload
              // const payload = {
              //   id: user.id,
              //   name: user.name,
              //   userType: user.userType,
              //   date: user.date,
              //   email: user.email,
              // };

              // // Sign token
              // const token = jwt.sign(
              //   payload,
              //   keys.secretOrKey,
              //   {
              //     expiresIn: 31556926, // 1 year in seconds
              //   },
              //   (err, token) => {
              //     res.json({ user, token });
              //   }
              // );

              return cb(null, user);
            } else {
              return cb(null, false, {
                message: 'Incorrect email or password.',
              });
            }
          });

          if (!user) {
            return cb(null, false, { message: 'Incorrect email or password.' });
          }
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: keys.secretOrKey,
    },
    function (jwtPayload, cb) {
      //find the user in db if needed
      return User.findById(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
