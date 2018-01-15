var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: "dhiat9kvf", 
  api_key: "146227195563155", 
  api_secret: "BL0xuM_U3RreNlWXS8aHfBttM_k"
});


router.get("/", function(req, res) {
    //eval(require("locus"));
    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
         Campground.find({name: regex}, function(err, allcampgrounds) {
            if (err) {
                console.log(err);
            } else {
             
                if (allcampgrounds.length < 1) {
                    noMatch = "No campgrounds match your search. Please try again...";
                }
                res.render("campgrounds/index", {campgrounds: allcampgrounds, noMatch: noMatch});
            }
        });
    } else {
    // get from database
        Campground.find({}, function(err, allcampgrounds) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds: allcampgrounds, noMatch: noMatch} );
            }
        })
     }
});

// route post page
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res)  {
    cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  req.body.campground.image = result.secure_url;
  // add author to campground
  req.body.campground.author = {
    id: req.user._id,
    username: req.user.username
  }
  Campground.create(req.body.campground, function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    res.redirect('/campgrounds/' + campground.id);
  });
    });
});

// route new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// show route
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, campgrounds){
        if (err) {
            console.log(err); 
        } else {
            res.render("campgrounds/show", {campgrounds: campgrounds});
        }
    });
});

//EDIT ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, findCampground) {
             res.render("campgrounds/edit", {campground: findCampground});
        });
});

//update route

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamground) {
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});


// delete route

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err) {
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
   }); 
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports = router;