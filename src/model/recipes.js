const mongoose = require('mongoose')

//recipes Shema
const recipeSchema = new mongoose.Schema(
    {
        recipe_name: String,
        ingredients:[
            {
                ingredient_id: {
                    type: mongoose.Types.ObjectId,
                    ref : 'ingredients'
                },
                
                stock_used: Number
            }
        ],
        price: Number,
        status : {type: String, enum:["active", "deleted"], default: "active"}
    },
    {timestamps : true}
  )
    
const recipes = mongoose.model("recipes", recipeSchema);

module.exports = {recipes}