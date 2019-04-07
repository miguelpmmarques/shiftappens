const mongoose=require('mongoose');
const Schema = mongoose.Schema;

//Create schema and models
const UserSchema= new Schema({
  name: String,
  team: String,
  x_pos:Number,
  y_pos:Number,
  z_pos:Number,
  game_id:Number
});

const User=mongoose.model('user',UserSchema);
module.exports=User;