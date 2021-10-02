const router = require('express').Router();
// const { connections } = require('mongoose');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getuser').get((req, res) => {
  User.find({$and:[{email: req.query["email"]},{password: req.query["password"]}]})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getuserbyid').get((req, res) => {
  User.find({_id: req.query["_id"]})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/singup').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  var connections = Array;

  const newUser = new User({
    username,
    email,
    password,
    connections,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addFriend/').post((req, res) => {
  const user1 = req.body.id1;
  const user2 = req.body.id2;
  User.findByIdAndUpdate(
    user1,
    { $addToSet: { friends: {id: user2}}},
    function (err, docs) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Updated User : ", docs);
      }
    });
    User.findByIdAndUpdate(
      user2,
      { $addToSet: { friends: {id: user1}}},
      function (err, docs) {
        if (err) {
          console.log(err)
        }
        else {
          console.log("Updated User : ", docs);
        }
      });


  // var friend = { id: req.body.id };
  // User.findByIdAndUpdate(
  //   req.params.id,
  //   { $addToSet: { friends: friend } },
  //   function (err, docs) {
  //     if (err) {
  //       console.log(err)
  //     }
  //     else {
  //       console.log("Updated User : ", docs);
  //     }
  //   });
  // res.json(req.params.id + " add friend!")
});



router.route('/removeFriend/:id').post((req, res) => {
  var friend = { id: req.body.id };
  User.findByIdAndUpdate(
    req.params.id,
    { $pull: { friends: friend } },
    function (err, docs) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Updated User : ", docs);
      }
    });
  res.json(req.params.id + " remove friend!")
});
module.exports = router;