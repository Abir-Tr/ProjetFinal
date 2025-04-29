const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {type:String, required:true},
  description:{type:String, required:true} ,
  price: {type:Number, required:true},
  category:{type:String,required: true}  // ex: Entrée, Plat principal, Dessert
});
 
const Menu=  mongoose.model('Menu', menuSchema);
module.exports = Menu