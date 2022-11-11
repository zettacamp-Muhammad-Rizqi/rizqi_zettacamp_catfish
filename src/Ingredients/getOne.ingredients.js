const { default: mongoose } = require('mongoose')
const {ingredients} = require('../model/Ingredients')

const getOneIngredient = async (_,{_id}) =>{

    const getOne = await ingredients.findOne(
        {
            _id: mongoose.Types.ObjectId(_id)
        }
    )
    return getOne
}

module.exports={getOneIngredient}