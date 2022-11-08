const { ApolloError } = require('apollo-server-errors')
const {users} = require('../model/Users') //Import model users
const bcrypt = require('bcryptjs')

const registUser = async (_, {register:{password, email, last_name, first_name}})=>{
    const oldUser = await users.findOne({email})

    if(oldUser){
        throw new ApolloError('A user is already registered with the email: '+email, ' User Already Exist')
    }

    let encryptedPassword = await bcrypt.hash(password, 10)

    const user = new users(
        {
            password: encryptedPassword,
            email: email,
            last_name: last_name,
            first_name: first_name,
        }
    )

    const saveUser = await user.save()
    return saveUser
}

module.exports = {registUser}