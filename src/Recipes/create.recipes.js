const {recipes} = require('../model/recipes')

const createRecipe = async (_, {input}) =>{
    let arrIngredient = []
    input.ingredients.forEach((ingredient)=>{
        arrIngredient.push({
            ingredient_id: mongoose.Types.ObjectId(ingredient),
            stock_used: input.stock_used
        })
    })

    const recipe = new recipes(
        {
            recipe_name : input.recipe_name,
            ingredients : arrIngredient,
            price: input.price
        },
    )
    const saveRecipe = await recipe.save()

    return saveRecipe
}

module.exports = {createRecipe}