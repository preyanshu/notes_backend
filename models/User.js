const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  usermodel=mongoose.model("user2",UserSchema) 
  
module.exports=usermodel //model and schema are the parameters