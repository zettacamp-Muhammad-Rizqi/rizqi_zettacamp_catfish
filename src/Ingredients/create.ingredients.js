const { ApolloError } = require('apollo-server-errors')
const {ingredients} = require('../model/Ingredients') //Import model ingredients

const createIngredient = async (_, {input:{name, stock}})=>{
    const oldIngredient = await ingredients.findOne({name})

    if(oldIngredient){
        throw new ApolloError('A user is already registered with the email: '+email, ' User Already Exist')
    }

    const ingredient = new ingredients(
        {
            name: name,
            stock: stock
        }
    )

    const saveIngredient = await ingredient.save()
    return saveIngredient
}

module.exports = {createIngredient}