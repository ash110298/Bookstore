
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Registration = require("./../../model/registration");
const jwt = require('jsonwebtoken');
const multer = require('multer');

router.post('someapi', function (req, res) {

});

router.post('/', (req, res, next) => {
    console.log('from react', req.body)

    Registration.findOne({email: req.body.email}, (err, user) => {
      if (err) res.send(err);
      console.log(user);
      if(user){
        return res.status(500).send({error: 'mail id exist'});
      }



      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).send({error: 'error in registration'});
        }



        Registration.findOne({phone: req.body.phone}, (err, cont) => {
          if (err) res.send(err);
          console.log(cont);
          if(cont){
            return res.status(500).send({error: 'phone no exist'});
          }

          let usernew = new Registration({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phone: req.body.phone
          });
          usernew.save().then(result => {
            return res.status(200).send(result);
          }).catch(err => {
            res.status(400).send('user error');
          });
      });
    });
});
});

router.post('/signin', async function (req, res, next) {
  let user = await Registration.findOne({email: req.body.email});
  if (!user) {
    return res.status(404).send('email not found');
  }
  bcrypt.compare(req.body.password, user.password, async function(err, result) {
    if (err) {
      return res.status(401).send('Credentials didn\'t match');
    }
    if (!result) {
      return res.status(401).send('Credentials didn\'t match');
    }
    try {
      let signed_token = jwt.sign({user: user._id, email: user.email}, 'gkdqkwdjkjgqwggdqgwjdg');
      return res.status(200).send({token: signed_token, user_id: user._id});
    } catch (err) {
        return res.status(401).send('Something went wrong while signin the token');
    }

  });
});

router.get("/:id", (req, res) => {
  Registration.findById(req.params.id, (err, result1) => {
		console.log("nowwwwwwwww");
		console.log(result1);
    if (err) res.status(500).json({error: 'error while fetching user'})
    res.status(200).send(result1);
  })
});

module.exports = router;


//
// let some = {
//   key1: 'value1',
//   key2: 'value2'
// }
//
//
// if ('key' in some) {
//   return 'found'
// } else {
//
// }

// if (some.hasOwnProperty('key')) {
//   return 'found'
// } else {
//
// }
//
// let arr = [1,2,3,4,5,6];
// arry.unshift()

// array properties
//
// let name_arr = ['waqaar', 'aslam'];
//
// name_arr.join(' ')

// waqaar aslam

// var arr = [
//   {
//     id: 1,
//     name: 'w',
//     emial: 'w@gmail.com'
//   },
//   {
//     id: 2,
//     name: 'w',
//     emial: 'w@gmail.com'
//   },
//   {
//     id: 3,
//     name: 'w',
//     emial: 'w@gmail.com'
//   }
// ]
//
// let new_Arr = arr.slice(1, 1)
//
// let new_Arr = [
//   {
//     id: 2,
//     name: 'w',
//     emial: 'w@gmail.com'
//   },
// ]
//

//
// let arr = [1,2,3,4, 6]
//
//
// arr.splice(3, 1, 89)
//
// [1, 2, 3, 89, 4, 6]


// react lifecylce hook


// class Somethig {
//   constructor () {
//     this.a = a
//     this.b = b
//   }
//
//   function run () {
//     return 3 * this.a;
//   }
//
// }
