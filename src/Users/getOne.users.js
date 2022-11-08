const { default: mongoose } = require('mongoose')
const {users} = require('../model/Users')

const getOneUser = async (_,{_id, email}) =>{
    if(_id){
        const getOne = await users.findOne(
            {
                _id: mongoose.Types.ObjectId(_id)
            }
        )
        return getOne
    }
    if(email){
        const getOne = await users.findOne(
            {
                email: email
            }
        )
        return getOne
    }
}

module.exports={getOneUser}