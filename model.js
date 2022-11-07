const { default: mongoose} = require("mongoose");

//Song Schema
const songSchema = new mongoose.Schema(
    {
        title: String,
        artist: String,
        duration : Number,
        genre : String
    },
    {timestamps : true}
  )
    
const songs = mongoose.model("songs", songSchema);

//Playlist Schema
const playlistSchema = new mongoose.Schema(
    {
        name : String,
        list_songs : [
            {
                _id : false,
                songs_id : {
                    type : mongoose.Types.ObjectId
                },
                date : Date
            },
        ]
    },
    {timestamps:true}
)

const playlists = mongoose.model("playlists", playlistSchema)

module.exports = {songs, playlists}