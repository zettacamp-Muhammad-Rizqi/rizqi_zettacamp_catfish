//require Express and Apollo-server-express
const {app, express, port} = require('./express')
const { ApolloServer} = require('apollo-server-express');

//mongoose require and model
const mongoose = require('mongoose')
const {typeDefs} = require('./Schema/typeDefs')
const {resolvers} = require('./Schema/resolvers')
const bookShelfLoader = require('./bookShelfLoader')
// const {books, bookShelfs} = require('./model')


//Server Connect
async function startServer(){
   
    const apolloServer = new ApolloServer({ 
        typeDefs,
        resolvers,
        context: function({
            req
        }){req:req
            return{
                bookShelfLoader
            }
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

    app.use((req,res)=>{
        res.send("Hello from express apollo server")
    })
}
startServer();

//Listen port
app.listen(port, () =>
      console.log(`🚀 Server ready at http://localhost:${port}`)
);