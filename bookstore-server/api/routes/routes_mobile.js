const express = require("express");
const router = express.Router();
const Mobile = require('../../model/mobile');


router.post("/", (req, res) => {
  console.log(req.body)
  Mobile.create({
    company: req.body.company,
     model: req.body.author,
      price: req.body.price}, 
  });
});

module.exports = router;
