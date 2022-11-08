const {users} = require('../model/Users')
const registUser = async (_, password, email, last_name, first_name)=>{
    const user = new users(
        {
            password: password,
            email: email,
            last_name: last_name,
            first_name: first_name,
        }
    )

    const saveUser = await user.save()
    return saveUser
}

module.exports = {registUser}