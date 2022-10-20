//Array Object for list song
const songs = [
    {
        no : 1,
        title : "The Color Violet",
        artist : "Tory Lanez",
        duration : 4,
        genre : "pop",
    },
    {
        no : 2,
        title : "You Belong With Me",
        artist : "Taylor Swift",
        duration : 3,
        genre : "pop",
    },
    {
        no : 3,
        title : "The Shadow",
        artist : "Blues Cousins",
        duration : 10,
        genre : "jazz",
    },
    {
        no : 4,
        title : "Begadang",
        artist : "Rhoma Irama",
        duration : 3,
        genre : "dangdut",
    },
    {
        no : 5,
        title : "Faded",
        artist : "Alan Walker",
        duration : 3,
        genre : "edm",
    },
    {
        no : 6,
        title : "FadedSing Me to Sleep",
        artist : "Alan Walker",
        duration : 3,
        genre : "edm",
    },
    {
        no : 7,
        title : "Judi",
        artist : "Rhoma Irama",
        duration : 5,
        genre : "dangdut",
    },
    {
        no : 8,
        title : "Tak Pernah Ternilai",
        artist : "Last Child",
        duration : 5,
        genre : "pop",
    },
    {
        no : 9,
        title : "Rider",
        artist : "Saykoji",
        duration : 3,
        genre : "rap",
    },
    {
        no : 10,
        title : "Not Afraid",
        artist : "Eminem",
        duration : 4,
        genre : "rap",
    },
    {
        no : 11,
        title : "Venom",
        artist : "Eminem",
        duration : 5,
        genre : "rap",
    },
    {
        no : 12,
        title : "What a wonderful World",
        artist : "Louis Armstrong",
        duration : 2,
        genre : "jazz",
    },
    {
        no : 13,
        title : "Craving You",
        artist : "Thomas Rhett",
        duration : 5,
        genre : "country",
    },
    {
        no : 14,
        title : "Wagon Wheel",
        artist : "Darius Rucker",
        duration : 5,
        genre : "country",
    },
    {
        no : 15,
        title : "Yours If You Want It",
        artist : "Rascal Flatts",
        duration : 5,
        genre : "country",
    },
]

//Express Declare
const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
// //test Event
// app.get('/', (req, res) => {
//     //Events
//     const Events = require('events')
//     const myEvents = new Events()

//     myEvents.on('program_start', (message)=>{
//         res.send(`Program is beginning, ${message}`)
//     })
//     myEvents.emit('program_start', 'Music') // fire or trigger
//     res.redirect('/list')
// })

function getToken(req, res, next){
    const {username, password} = req.body;
    jwt.sign({
        username, password
    }, "secret", function(err, token){
        if (err){
            res.send(err)
        }else{
            res.send(token)
        }
    })
}
app.post('/login', express.urlencoded({extended:true}) ,getToken, (req, res) => {
    res.send()
})

app.get('/list', (req, res) => {
    res.send(songs)
})

//group by artist
app.post('/groupArtist', (req, res) => {
    const {artist}= req.query
    res.send(groupByArtist(songs, artist))
})

app.post('/groupGenre', (req, res) => {
    const {genre}= req.query
    res.send(groupByGenre(songs, genre))
})

app.post('/groupDuration', (req, res) => {
    const {duration}= req.query
    res.send(groupByDuration(songs, duration))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/about', (req, res) => {
    const fs = require('fs/promises')
    let data = fs.readFile('./message.txt', {encoding:'utf-8'})
    data
        .then((result)=>{
            res.send(result)
        })    
        .catch((err)=>{
            console.log("Get an Error!")
            res.send(err)
        })
})


//Last Task
function groupByArtist(songs, name){
    let artistName = songs.filter(artistName=>artistName.artist===name)
    // console.log(...artistName)
    return artistName
}

function groupByGenre(songs, nameGenre){
    let genreName = songs.filter(genreName=>genreName.genre===nameGenre)
    // console.log(...genreName)
    return genreName
}

function groupByDuration(songs, minute){
    //this function for group songs less one hour
    
    let addition = 0
    let playlist = []
    for(let i=0; i<songs.length; i++){
        if(addition+songs[i].duration<minute){
            playlist.push(songs[i])
            // console.log(songs[i]) 
            addition +=songs[i].duration
        }
    }
    // console.log(addition)
    return {
        ...playlist,
        addition
    }
}