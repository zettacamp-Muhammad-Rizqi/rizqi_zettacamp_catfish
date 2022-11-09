const jwt = require('jsonwebtoken')
const { ApolloError } = require('apollo-server');

const authToken = async (resolver, parent, args, context, info) =>{
    const tokenUser = context.req.headers.authorization || '';

    if(!tokenUser){
        throw new ApolloError("Token Empty")
    }
    jwt.verify(tokenUser, "secret", (err,decode)=>{
        if (err){
            throw new ApolloError(err, 'Unauthorize, check the token !!!')
        }
        context.req.user_id = decode.user_id
    })

    return resolver(parent, args, context, info)
}

module.exports = {
    // Query: {
    //     GetAllUser: authToken,
    //     GetOneUser: authToken,
    // },
    // Mutation: {
    //     UpdateUser : authToken,
    //     DeleteUser : authToken,
    // }
}