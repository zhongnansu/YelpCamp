var mongoose = require("mongoose");
// create schema 
var campgroundSchema = new mongoose.Schema({
    name: String ,
    image: String,
    price: String,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    createdAt: {
        type: Date, 
        default: Date.now
    },
    author: {
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
}, {usePushEach: true});
// create the model
module.exports = mongoose.model("campground", campgroundSchema);
