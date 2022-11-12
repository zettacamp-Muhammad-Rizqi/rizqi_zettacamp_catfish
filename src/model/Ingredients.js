const mongoose = require('mongoose')

//ingredient Schema
const ingredientSchema = new mongoose.Schema(
    {
        name: String,
        stock: Number,
        status : {type: String, enum:["active", "deleted"], default: "active"}
    },
    {timestamps : true}
  )
    
const ingredients = mongoose.model("ingredients", ingredientSchema);

module.exports = {ingredients}