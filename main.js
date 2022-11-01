//Require express and mongoose
const {app, express, port} = require('./express')
const mongoose = require('mongoose')

//Mongose Connections
async function connected(){
    await mongoose.connect('mongodb://localhost:27017/zettacamp_batch3');
}
connected()

//Require model
const {songs, playlists} = require('./model')

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
//insert the playlist
app.post('/insertPlaylist', express.urlencoded({extended:true}), async (req, res) => {
    const {name, list_songs} = req.body
    const splitSong = list_songs.split(',')
    //make array for save id books
    let arrSong = []
    
    splitSong.forEach((song)=>{
        arrSong.push({
            songs_id: mongoose.Types.ObjectId(song),
            date: new Date()
        })
    })

    const playlist = new playlists(
        {
            name : name,
            list_songs : arrSong
        },
        )
        const savePlaylist = await playlist.save()
        res.send(savePlaylist)
})

//Show Data from Collections
app.get('/', express.urlencoded({extended:true}), async (req, res) => {
    const showSongs = await songs.find({})
    res.send(showSongs)
})
app.get('/playlist', express.urlencoded({extended:true}), async (req, res) => {
    const showPlaylists = await playlists.find({})
    res.send(showPlaylists)
})

//Update
app.post('/updateSong', express.urlencoded({extended:true}), async (req, res) => {
    let {_id, title, artist, duration, genre} = req.body
    const updateSong = await songs.findByIdAndUpdate(
        {
            _id : _id
        },
        {
            $set : {
                title: title,
                artist: artist,
                duration : duration,
                genre : genre
            }
        }
    )
    res.send(updateSong)
})

app.post('/updatePlaylist', express.urlencoded({extended:true}), async (req, res) => {
    //on progress
})

//Listen Port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
 })