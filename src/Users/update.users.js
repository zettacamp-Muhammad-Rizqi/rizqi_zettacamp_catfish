const { default: mongoose } = require('mongoose')
const { ApolloError } = require('apollo-server-errors')
const bcrypt = require('bcryptjs')
const {users} = require('../model/Users') //import model users

const updateUser = async (_, {update:{_id, password, email, last_name, first_name}})=>{
    const oldUser = await users.findOne({email})

    if(oldUser){
        throw new ApolloError('A user is already with the email: '+email)
    }
    if(password){
        let encryptedPassword = await bcrypt.hash(password, 10)
        const update = await users.findByIdAndUpdate(
            {
                _id : mongoose.Types.ObjectId(_id)
            },
            {
                $set: {
                    password: encryptedPassword,
                    email: email,
                    last_name: last_name,
                    first_name: first_name,
                }
            },
            {
                new: true
            }
        )
        return update
    }
    if(!password){
        const update = await users.findByIdAndUpdate(
            {
                _id : mongoose.Types.ObjectId(_id)
            },
            {
                $set: {
                    email: email,
                    last_name: last_name,
                    first_name: first_name,
                }
            },
            {
                new: true
            }
        )
        return update
    }
}

module.exports = {updateUser}