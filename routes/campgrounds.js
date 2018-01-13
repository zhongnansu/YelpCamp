var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var camp = {name: name, price: price, image: image, description: desc, author: author};
    Campground.create(camp, function(err, newcamp) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
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