//require Express and Apollo-server-express
const {app, express, port} = require('./express')
const { ApolloServer} = require('apollo-server-express');

//mongoose require and model
const mongoose = require('mongoose')
const {typeDefs} = require('./GraphQL/typeDefs')
const {resolvers} = require('./GraphQL/resolvers')

//loader
const 
    songLoader
= require('./song/songLoader')

// console.log(songLoader)


//Server Connect
async function startServer(){
   
    const apolloServer = new ApolloServer({ 
        typeDefs,
        resolvers,
        context: function ({
            req
        }) {
            req : req;
            return {
                songLoader,
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

    app.use((req,res)=>{
        res.send("Hello from express apollo server")
    })
}
startServer();

//Listen Port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
 })

//insert the song to collection
app.post('/insertSong', express.urlencoded({extended:true}), async (req, res) => {
    const {title, artist, duration, genre} = req.body

    const song = new songs(
        {
            title: title,
            artist: artist,
            duration: duration,
            genre: genre
        }
    )
    const saveSong = await song.save()
    res.send(saveSong)
})