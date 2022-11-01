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
    //make array for save id songs
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
app.put('/updateSong', express.urlencoded({extended:true}), async (req, res) => {
    let {id_song, title, artist, duration, genre} = req.body
    const updateSong = await songs.findByIdAndUpdate(
        {
            _id : id_song
        },
        {
            $set : {
                title: title,
                artist: artist,
                duration : duration,
                genre : genre
            }
        },
        {
            new : true
        }
    )
    res.send(updateSong)
})

app.put('/updatePlaylist', express.urlencoded({extended:true}), async (req, res) => {
    let {id_playlist, name, id_song} = req.body
    let splitSong = id_song.split(',')
    const arrSong = []

    splitSong.forEach((song)=>{
        arrSong.push({
            songs_id: mongoose.Types.ObjectId(song),
            date: new Date()
        })
    })

    const updatePlaylist = await playlists.updateOne(
        {
            _id : mongoose.Types.ObjectId(id_playlist)
        },
        {
            $set:{
                name : name,
                list_songs : arrSong
            }
        }
        
    )
    res.send(updatePlaylist)
})

//delete
app.delete('/deleteSong', express.urlencoded({extended:true}), async (req, res) => {
    let {id_song} = req.body
    const deleteSong = await songs.deleteOne(
        {
            id_song
        }
    )
    res.send(deleteSong)
})
app.delete('/deletePlaylist', express.urlencoded({extended:true}), async (req, res) => {
    let {id_playlist} = req.body
    const deletePlaylist = await playlists.deleteOne(
        {
            id_playlist
        },
        {
            new:true
        }
    )
    res.send(deletePlaylist)
})

//Aggregate lookup with sort
app.get("/sort",express.urlencoded({extended:true}),async(req,res)=>{
    let{name} = req.body
    const sortPlaylist = await playlists.aggregate([
        {
            $lookup:{
                from : "songs",
                localField : "list_songs.songs_id",
                foreignField : "_id",
                as : "list_songs"
            }
        },
        {
            $sort:{
                name : parseInt(name)
            }
        },
        {
            $project:{
                songs_id:0,
                "list_songs.createdAt":0,
                "list_songs.updatedAt":0,
                "list_songs.__v":0
            }
        } 
    ])
    res.send(sortPlaylist)
});

//pagination
app.post("/pagination",express.urlencoded({extended:true}),async(req,res)=>{
    let {page, limit} = req.body

    page = parseInt(page)-1 //start from zero
    limit = parseInt(limit)
    
    if(page<0){
        page = 1 // the page start from 1
    }
    const pagination = await songs.aggregate([
        
        
        {
            $skip: page*limit
        },
        {
            $limit: limit
        },
        {
            $group: {
                _id: ["$title","$artist","$duration"]
            }
        },
        {
            $addFields: {
                page: {
                    $sum: [

                        page, 1
                    ]
                }
            }
        }
    ])
    res.send(pagination)
});

//match artist
app.post("/matchArtist",express.urlencoded({extended:true}),async(req,res)=>{
    let{artist} = req.body
    const findArtist = await songs.aggregate([
        {
            $match:{
                artist :  artist
            }
        },
        {
            $group: {
                _id: ["$title","$artist","$duration"]
            }
        },
    ])
    res.send(findArtist)
});

//faced
app.get("/facet",express.urlencoded({extended:true}),async(req,res)=>{
    const facet = await songs.aggregate([
        {
           $facet: {
            "category_by_price": [
                {
                    $group:{
                   _id: "$genre",
                   title: {
                       $push: "$title"
                   },
                   many : {
                       $sum: 1
                   }
                  }
                }
            ]
           }
        }
    ])
    res.send(facet)
});


//Perbaiki faced untuk include si pagination di dalam faced
//terus buat untuk filter-filter yang lain di dalam facet yang di lookup

//Listen Port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
 })