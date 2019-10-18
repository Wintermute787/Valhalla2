const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");
//load user profile
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");

//@route    Get api/profile/test
//@desc     tests profile route
//@access   public
router.get("/test", (req, res) => {
  res.json({ msg: "profile route works" });
});

//@route    Get api/profile
//@desc     get current users profile
//@access   private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "theres no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route    Get api/profile/all
//@desc     get all profiles
//@access   public
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "there are no profiles";
        res.status(404).json(errors);
      } else {
        res.json(profiles);
      }
    })
    .catch(err => {
      res.status(404).json({ profile: "there are no profiles" });
    });
});

//@route    Get api/profile/username/:username
//@desc     get profile by username
//@access   public
router.get("/username/:username", (req, res) => {
  const errors = {};
  Profile.findOne({ username: req.user.username })
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(error => res.status(404).json(error));
});

//@route    Get api/profile/user/:user_id
//@desc     get profile by user id
//@access   public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(error =>
      res.status(404).json({ profile: "there is no profile for this user" })
    );
});

//@route    POST api/profile
//@desc     create or edit user profile
//@access   private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }
    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;

    //favoriteGames = split into an array
    if (typeof req.body.favoriteGames !== "undefined") {
      profileFields.favoriteGames = req.body.favoriteGames.split(",");
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create
        //check to see if username exists (no multiple usernames)
        Profile.findOne({ username: profileFields.username }).then(profile => {
          if (profile) {
            errors.username = "that user name already exists";
            res.status(400).json(errors);
          }
          //save profile if no error
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//@route    DELETE api/profile
//@desc     Delete user and profile
//@access   private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findByIdAndRemove({ user: req.user.id }).then(() => {
      User.findByIdAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
