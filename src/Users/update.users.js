//import model users
const {users} = require('../model/Users')

const updateUser = async (_, {updateUser:{email}})=>{
    const update = await users.findByIdAndUpdate(
        {
            email: email
        },
        {
            $set: {
                status : "deleted"
            }
        }
    )

    return update
}

module.exports = {updateUser}