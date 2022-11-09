const {users} = require('../src/model/Users')
const { ApolloError } = require('apollo-server-errors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (_, {email, password}) =>{
    const user = await users.findOne({email})
    const decrypt = await bcrypt.compare(password, users.password)

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
        return token
    } else {
        throw new ApolloError('Incorrect email or password')
    }


}

module.exports = {loginUser}