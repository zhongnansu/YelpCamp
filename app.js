var express = require("express"),
    app = express(),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    seedDB = require("./seed"),
    User = require("./models/user"),
    Comment =require("./models/comment"),
    flash = require("connect-flash"),
    methodOverride = require("method-override");


//require routes
var commentRoutes = require("./routes/comment"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes  = require("./routes/auth");
    
// seedDB();    
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v9"
mongoose.connect(url, { useMongoClient: true });


app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));      
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//----------------------
//PASSPORT CONFIGURATION
//---------------------
app.use(require("express-session") ({
    secret: "David is a good man",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// // middleware
app.use(function(req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server Started");
});