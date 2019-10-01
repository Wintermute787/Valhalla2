const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const Games = require("../../models/Games");

const validateGamesInput = require("../../validation/games");

//@route    Get api/games/test
//@desc     tests games route
//@access   public
router.get("/test", (req, res) => {
  res.json({
    msg: "test route works"
  });
});

//@route     GET api/games
//@desc     GET current users games
//@access   Private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};
    Games.findOne({
      user: req.user.id
    })
      .populate("user", ["name"])
      .then(games => {
        if (!games) {
          errors.nogames = "there are no games for this user";
          return res.status(404).json(errors);
        }
        res.json(games);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route     GET api/games/all
//@desc     GET all games
//@access   public
router.get("/all", (req, res) => {
  Games.find()
    .populate("user", ["name"])
    .then(games => {
      if (!games) {
        errors.nogames = "there are no games";
        return res(404).json(errors);
      } else {
        res.json(games);
      }
    })
    .catch(err => {
      res.status(404).json({
        games: "there are no games"
      });
    });
});

//@route     GET api/games/user/:user_id
//@desc     GET games by user_id
//@access   public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Games.find()
    .populate("user", ["name"])
    .then(games => {
      if (!games) {
        errors.nogame = "there is no game for this user";
        res.status(404).json(errors);
      } else {
        res.json(games);
      }
    })
    .catch(error =>
      res.status(404).json({
        games: "there is no game for this user"
      })
    );
});

//@route     POST api/games
//@desc     create games
//@access   private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateGamesInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    //get fields
    const gamesFields = {};
    gamesFields.user = req.user.id;
    if (req.body.title) gamesFields.title = req.body.title;
    if (req.body.description) gamesFields.description = req.body.description;
    if (req.body.image) gamesFields.image = req.body.image;

    //tags split into an array
    if (typeof req.body.tags !== "undefined") {
      gamesFields.tags = req.body.tags.split(",");
    }
    new Games(gamesFields).save().then(games => res.json(games));
  }
);

//@route     POST api/games/:id
//@desc     update games
//@access   Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGamesInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    //get fields
    const gamesFields = {};
    gamesFields.user = req.user.id;
    if (req.body.title) gamesFields.title = req.body.title;
    if (req.body.description) gamesFields.description = req.body.description;
    if (req.body.image) gamesFields.image = req.body.image;

    //tags split into an array
    if (typeof req.body.tags !== "undefined") {
      gamesFields.tags = req.body.tags.split(",");
    }
    Games.findById({ _id: req.params.id }).then(games => {
      Games.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: gamesFields },
        { new: true }
      )
        .populate("user", ["name"])
        .then(games => res.json(games));
    });
  }
);

//@route     POST api/games/:id/players
//@desc     assign a player to a game
//@access   private
router.post(
  "/:id/players",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Games.findById(req.params.id)
        .then(game => {
          if (
            game.players.filter(
              player => player.user.toString() === req.user.id
            ).length > 0
          ) {
            return res.status(400).json({
              playerassigned: "player is already assigned"
            });
          }
          //add user id to players array
          game.players.unshift({
            user: req.user.id
          });
          game.save().then(game => res.json(game));
        })
        .catch(err =>
          res.status(404).json({
            gamenotfound: "no game found"
          })
        );
    });
  }
);

//@route     DELETE api/games/:id/players/players_id
//@desc     DELETE a player from a game
//@access   private
router.delete(
  "/:id/players/:players_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Games.findById(req.params.id)
      .then(game => {
        //check to see if player exists
        if (
          game.players.filter(
            player => player._id.toString() === req.params.players_id
          ).length === 0
        ) {
          return res.status(404).json({
            playerdoesnotexist: "player does not exist"
          });
        }
        //get remove index
        const removeIndex = game.players
          .map(item => item._id.toString())
          .indexOf(req.params.players_id);

        //splice comment out of array
        game.players.splice(removeIndex, 1);
        game.save().then(game => res.json(game));
      })
      .catch(err =>
        res.status(404).json({
          playernotfound: "no player found "
        })
      );
  }
);

//@route     DELETE api/games/:id
//@desc     Delete Game
//@access   Private
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Games.findOneAndRemove({
      _id: req.params.id
    }).then(() => {
      res.json({
        success: true
      });
    });
  }
);

module.exports = router;
