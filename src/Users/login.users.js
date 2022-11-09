const {users} = require('../model/Users')
const { ApolloError } = require('apollo-server-errors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (_, {input: {email, password}}) =>{
    const user = await users.findOne({email})
    const decrypt = await bcrypt.compare(password, user.password)
    // console.log(user)
    // console.log(decrypt)

    if(user && decrypt){
        const token = jwt.sign(
            {
                user_id: user.id
            },
            "secret",
            {
                expiresIn: '2h'
            }
        )
        // console.log(token)
        return {token} //karena bentuknya object, kalau ga di kasih kurung kerawal dia bakal null
    } else {
        throw new ApolloError('Incorrect email or password')
    }


}

module.exports = {loginUser}