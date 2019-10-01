const express = require("express");
const router = express.Router();
const passport = require("passport");

const Character = require("../../models/Character");
const validateCharacterInput = require("../../validation/character");

//@route     GET api/characters
//@desc     GET Users characters
//@access   private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateCharacterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Character.find()
      .populate("user", ["name"])
      .then(character => {
        if (!character) {
          errors.nocharacter = "there is no character for this user";
          return res.status(404).json(errors);
        } else {
          res.json(character);
        }
      })
      .catch(err =>
        res
          .status(404)
          .json({ character: "there is no character for this user" })
      );
  }
);

//@route     GET api/character/user/:user_id
//@desc     GET Users characters by id
//@access   public

router.get("/user/:user_id", (req, res) => {
  Character.find()
    .populate("user", ["name"])
    .then(characters => {
      if (!characters) {
        errors.nocharacter = "there are no characters for this user";
        res.status(404).json(errors);
      } else {
        res.json(characters);
      }
    })
    .catch(err => {
      res.status(404).json({
        character: "there are no characters"
      });
    });
});

//@route     POST api/character
//@desc     Create Characters
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCharacterInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    // get character fields
    const characterFields = {};
    characterFields.user = req.user.id;

    if (req.body.characterName)
      characterFields.characterName = req.body.characterName;

    if (req.body.level) characterFields.level = req.body.level;

    if (req.body.race) characterFields.race = req.body.race;

    if (req.body.sex) characterFields.sex = req.body.sex;

    if (req.body.job) characterFields.job = req.body.job;

    //items split into an array
    if (typeof req.body.items !== "undefined") {
      characterFields.items = req.body.items.split(",");
    }

    new Character(characterFields)
      .save()
      .then(character => res.json(character));
  }
);

//@route     POST api/character/:id
//@desc     update Characters
//@access   Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCharacterInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    // get character fields
    const characterFields = {};
    characterFields.user = req.user.id;

    if (req.body.characterName)
      characterFields.characterName = req.body.characterName;

    if (req.body.level) characterFields.level = req.body.level;

    if (req.body.race) characterFields.race = req.body.race;

    if (req.body.sex) characterFields.sex = req.body.sex;

    if (req.body.job) characterFields.job = req.body.job;

    //items split into an array
    if (typeof req.body.items !== "undefined") {
      characterFields.items = req.body.items.split(",");
    }
    Character.findById({ _id: req.params.id }).then(character => {
      Character.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: characterFields },
        { new: true }
      )
        .populate("user", ["name"])
        .then(character => res.json(character));
    });
  }
);

//@route     DELETE api/character/:id
//@desc     Delete a Character
//@access   Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Character.findOneAndRemove({
      _id: req.params.id
    }).then(() => res.json({ success: "success" }));
  }
);

module.exports = router;
