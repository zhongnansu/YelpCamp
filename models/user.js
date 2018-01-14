var mongoose =require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
    username: String,
    pasword: String,
    isAdmin: {type: Boolean, default: false}
});

var options = {
    errorMessages: {
        IncorrectPasswordError: 'Password is incorrect',
        IncorrectUsernameError: 'Username is incorrect'
    }
};

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", UserSchema);