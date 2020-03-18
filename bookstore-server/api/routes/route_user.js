const express = require("express");
const router = express.Router();
const User = require('../../model/user');


router.get("/", (req, res) => {
  User.find({}, (err, users) =>  {
    if (err) res.status(500).send({error: 'error while fetching users'});
    res.status(200).send(users);
  });
});

router.post("/", (req, res) => {
  console.log('new user', req.body)
  let user = new User({name: req.body.name,
    email: req.body.email,
     mobile: req.body.mobile,
      password: req.body.password});
  user.save(function(err, user) {
      if (err) res.status(500).send({error: 'error while inserting form'});
      res.status(200).send(user);
  });
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, {name: req.body.name,
    mobile: req.body.mobile,
    password: req.body.password} ,
    {new: true},
    (err, user) =>  {
    if (err) res.status(500).send({error: 'error while updating user'});
    res.status(200).send(user);
  });
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) =>  {
    if (err) res.status(500).send({error: 'error while deleting user'});
    res.status(200).send('user deleted');
  });
});

module.exports = router;
