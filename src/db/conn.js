const mongoose = require("../database");
 
// create an schema
var userSchema = new mongoose.Schema({
            Name: String,
            Email:String,
            Balance:Number
        });
 
var userModel=mongoose.model('users',userSchema);
 
module.exports = mongoose.model("Users", userModel);