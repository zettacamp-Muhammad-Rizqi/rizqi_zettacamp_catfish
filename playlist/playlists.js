const mongoose = require('mongoose')
const {playlists} = require('../model')

const insertPlaylist = async (_, {name, list_songs}) =>{
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

    return savePlaylist
}

module.exports = {insertPlaylist}