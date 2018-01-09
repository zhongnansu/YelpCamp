var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus dignissim nibh ut sagittis. Nullam in interdum ante. Etiam eu magna vel ex varius pulvinar a non magna. Praesent lacinia purus eros, a tempus nunc viverra id. Sed pellentesque odio sit amet dolor hendrerit tempor. Vivamus eu pulvinar ligula. In eget neque non justo ornare consectetur a vitae nisl. Proin viverra malesuada ipsum ut bibendum. Integer ut vulputate lacus. Fusce hendrerit porttitor dui, eu dictum libero hendrerit quis. Nulla viverra augue a arcu volutpat, non cursus velit ullamcorper. Phasellus a vestibulum elit. Nullam eu sapien in elit pretium fringilla ut nec ex."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus dignissim nibh ut sagittis. Nullam in interdum ante. Etiam eu magna vel ex varius pulvinar a non magna. Praesent lacinia purus eros, a tempus nunc viverra id. Sed pellentesque odio sit amet dolor hendrerit tempor. Vivamus eu pulvinar ligula. In eget neque non justo ornare consectetur a vitae nisl. Proin viverra malesuada ipsum ut bibendum. Integer ut vulputate lacus. Fusce hendrerit porttitor dui, eu dictum libero hendrerit quis. Nulla viverra augue a arcu volutpat, non cursus velit ullamcorper. Phasellus a vestibulum elit. Nullam eu sapien in elit pretium fringilla ut nec ex."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus dignissim nibh ut sagittis. Nullam in interdum ante. Etiam eu magna vel ex varius pulvinar a non magna. Praesent lacinia purus eros, a tempus nunc viverra id. Sed pellentesque odio sit amet dolor hendrerit tempor. Vivamus eu pulvinar ligula. In eget neque non justo ornare consectetur a vitae nisl. Proin viverra malesuada ipsum ut bibendum. Integer ut vulputate lacus. Fusce hendrerit porttitor dui, eu dictum libero hendrerit quis. Nulla viverra augue a arcu volutpat, non cursus velit ullamcorper. Phasellus a vestibulum elit. Nullam eu sapien in elit pretium fringilla ut nec ex."
    }
]


function seedDB() {
    //Remove all the campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("remove all");
            // add the initial campgrounds
            // data.forEach(function(seed) {
            //   Campground.create(seed, function(err, campground) {
            //       if (err) {
            //           console.log(err);
            //       } else {
            //           console.log("add a campground");
            //           Comment.create({
            //               text: "This is the most fantastic place",
            //               author: "Lucy"
            //           }, function(err, comment) {
            //               if (err) {
            //                   console.log(err);
            //               } else {
            //                     campground.comments.push(comment);
            //                     campground.save();
            //                     console.log("create a new comment");
            //               }
            //           });
            //       }
            //   }); 
            // });
        }
    });
}


module.exports = seedDB;