const { default: mongoose } = require('mongoose')
const {users} = require('../model/Users')

const deleteUser = async (_,{_id}) =>{
    const updateStatus = await users.findByIdAndUpdate(
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

module.exports = {deleteUser}