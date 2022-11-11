const mongoose = require('mongoose')

//Book Shema
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