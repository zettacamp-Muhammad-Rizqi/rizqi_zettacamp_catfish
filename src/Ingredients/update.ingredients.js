const { default: mongoose } = require('mongoose')
const {ingredients} = require('../model/Ingredients') //import model

const updateIngredient = async (_, {_id, stock})=>{

    const update = await ingredients.findByIdAndUpdate(
        {
            _id : mongoose.Types.ObjectId(_id)
        },
        {
            $set: {
                stock: stock
            }
        },
        {
            new: true
        }
    )
    return update
}

module.exports = {updateIngredient}