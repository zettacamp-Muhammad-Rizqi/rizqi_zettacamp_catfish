//expressjs start here
const express = require('express')
const app = express()
const port = 4000

//Apollo Require
const { ApolloServer} = require('apollo-server-express');

//Mongoose and GraphQL Import
const mongoose = require('mongoose')
const {applyMiddleware} = require('graphql-middleware')
const {makeExecutableSchema} = require('graphql-tools')

//import lodash to merge
const {merge} = require('lodash')

const {typeDefs} = require('./GraphQL/typeDefs')
const {resolvers} = require('./GraphQL/resolvers')

// //import auth
const authUser = require('./middleware/auth.users')

const auth = merge(authUser)

// //Schema executable
const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//make protected schema for apply middleware for auth
const protectedSchema = applyMiddleware(executableSchema, auth)

//Server Connect
async function startServer (){
   
    const apolloServer = new ApolloServer({ 
        schema: protectedSchema,
        typeDefs,
        resolvers,
        context: function ({
            req
        }) {
            req;
            return {
                req
            };
        }
    });
    //Mongoose connect and apollo start
    await mongoose.connect('mongodb://localhost:27017/zettacamp_batch3', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log('Mongoose connected....')
    
    await apolloServer.start()
    
    
    apolloServer.applyMiddleware({ app });

    app.use((res)=>{
        res.send("Hello from express apollo server")
    })

    //Listen port
    app.listen(port, () =>
        console.log(`🚀 Server ready at http://localhost:${port}`)
    );
}
startServer();

