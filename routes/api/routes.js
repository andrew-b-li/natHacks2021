const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const mongoose = require('mongoose');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const { body, check, validationResult } = require('express-validator');

// Load User model
const User = require('../../models/User');
const Calendar = require('../../models/Calendar');
const Chat = require('../../models/Chat');
const Session = require('../../models/Session');

// #region Helpers
const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, next);
};
// Error handler for async / await functions
const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
// #endregion

router.post(
  '/users/register',
  body('name').not().isEmpty().trim().escape().withMessage('Invalid name.'),
  body('userType')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Invalid user type.'),
  body('email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage('Invalid email.'),
  body('password').not().isEmpty().withMessage('Invalid password.'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array().map((x) => x.msg) });
    }

    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({ errors: ['Email is already in use.'] });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          userType: req.body.userType,
          password: req.body.password,
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                // res.json(user)
                // Create JWT Payload
                const payload = {
                  id: user.id,
                  name: user.name,
                  userType: user.userType,
                  date: user.date,
                  email: user.email,
                };

                // Sign token
                const token = jwt.sign(
                  user,
                  keys.secretOrKey,
                  {
                    expiresIn: 31556926, // 1 year in seconds
                  },
                  (err, token) => {
                    res.json({ user, token });
                  }
                );
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
);

router.post(
  '/users/login',
  body('email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage('Invalid email'),
  body('password').not().isEmpty().withMessage('Invalid password'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array().map((x) => x.msg) });
    }

    passport.authenticate('local', { session: false }, (err, user, info) => {
      console.error(err);
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed',
          user: user,
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }

        const payload = {
          id: user.id,
          name: user.name,
          userType: user.userType,
          date: user.date,
          email: user.email,
        };

        const token = jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({ payload, token });
          }
        );

        // const token = jwt.sign(user, keys.secretOrKey);
        // return res.json({ user, token });
      });
    })(req, res);
  }
);

router.get(
  '/users/calendar',
  isAuthenticated,
  catchErrors(async (req, res) => {
    if (req.user) {
      const userCalendar = await Calendar.findOne({
        ownerId: req.user.id,
      });
      res.json(userCalendar);
    }
  })
);
router.post(
  '/users/calendar/event/create',
  isAuthenticated,
  body('targetId').notEmpty().withMessage('Invalid targetId'),
  body('events').isArray().notEmpty().withMessage('Invalid events'),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array().map((x) => x.msg) });
    }

    if (req.user) {
      const addEventToCalendar = await Calendar.findOneAndUpdate(
        { ownerId: req.body.targetId },
        {
          $addToSet: {
            events: req.body.events,
          },
        },
        { upsert: true, new: true }
      );
      res.json(addEventToCalendar);
    }
  })
);
router.post(
  '/users/calendar/event/delete',
  isAuthenticated,
  body('targetId').notEmpty().withMessage('Invalid targetId'),
  body('eventId').notEmpty().withMessage('Invalid eventId'),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array().map((x) => x.msg) });
    }

    if (req.user) {
      // try {
      const removeEventFromCalendar = await Calendar.findOneAndUpdate(
        { ownerId: req.body.targetId },
        {
          $pull: {
            events: { ['_id']: req.body.eventId },
          },
        }
      );
      res.json(removeEventFromCalendar);
      // } catch (err) {
      //   console.error(err);
      //   return res.status(400).json(err);
      // }
    }
  })
);

module.exports = router;
