const mongoose = require('mongoose')

//recipes Shema
const recipeSchema = new mongoose.Schema(
    {
        recipe_name: String,
        _id: false,
        ingredients:[
            {
                ingredient_id: {
                    type: mongoose.Types.ObjectId
                },
                
                stock_used: Number
            }
        ],
        status : {type: String, enum:["active", "deleted"], default: "active"}
    },
    {timestamps : true}
  )
    
const recipes = mongoose.model("recipes", recipeSchema);

module.exports = {recipes}