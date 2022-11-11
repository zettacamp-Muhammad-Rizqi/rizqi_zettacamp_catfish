const { default: mongoose } = require('mongoose')
const {ingredients} = require('../model/Ingredients')

const deleteIngredient = async (_,{_id}) =>{
    const updateStatus = await ingredients.findByIdAndUpdate(
        {
            _id : mongoose.Types.ObjectId(_id)
        },
        {
            $set: {
                status : "deleted"
            }
        },
        {
            new: true
        }
    )
    
    return updateStatus
}

module.exports = {deleteIngredient}