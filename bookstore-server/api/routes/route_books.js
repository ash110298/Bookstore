const express = require("express");
const router = express.Router();
const Book = require('../../model/book');
const jwt = require('jsonwebtoken');
const multer = require('multer');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, 'uploads/')
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname.split(' ').join('_'))
	}
});

var upload = multer({storage: storage});

// var originalname = '';
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'mp-testing',
//     acl: 'public-read',
//     key: function (request, file, cb) {
//       console.log(file);
//       originalname = file.originalname;
//       cb(null, file.originalname);
//     }
//   })
// }).array('image', 1);

//
// router.get("/", upload.single('avatar'), (req, res) => {
//   rg({error: 'error while fetching books'})
//     res.status(200).send(books);
//   })
// });

router.get("/", (req, res) =>{

})
// req.file contains single file
// req.files -> multiple

// multipart at front end
// metion multiple if sending multiple images


// console req.file

router.get("/:category_name", (req, res) => {
  Book.find({category: req.params.category_name}, (err, book) => {
    if (err) res.status(500).json({error: 'error while fetching books'})
    res.status(200).send(book);
  })
});



router.get("/append/:id", (req, res) => {
  Book.findById(req.params.id, (err, book) => {
		console.log("nowwwwwwwww");
		console.log(book);
    if (err) res.status(500).json({error: 'error while fetching books'})
    res.status(200).send(book);
  })
});

// router.put('/', function(req, res) {
// 	let data ={title: 'old or new name', price: 12314, }
// 	Book.findByIdAndUpdate(id, data, function(err, res) {
//
// 	})
// })

router.post("/", upload.array('photo', 12), (req, res) => {
   let some_obj = {}
   for (let i = 0; i < req.files.length; i++) {
     let other_obj = {
       ['image_url' + i]: req.files[i].originalname
     }
     some_obj = {...some_obj, ...other_obj}
   }
   let main_obj = {...some_obj, ...req.body};
   Book.create(main_obj, function (err, book) {
        if (err) res.status(500).json({error: 'error while inserting book'})
        res.status(200).send(book);
   });
});

module.exports = router;
