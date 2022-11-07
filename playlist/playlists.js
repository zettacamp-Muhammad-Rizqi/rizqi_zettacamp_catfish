const mongoose = require('mongoose')
const {playlists} = require('../model')

const insertPlaylist = async (_, {inputSong}) =>{
    console.log(inputSong)
    // const splitSong = list_songs.split(',')

    //make array for save id songs
    let arrSong = []
    console.log(inputSong.song_ids)
    inputSong.song_ids.forEach((song)=>{
        arrSong.push({
            songs_id: mongoose.Types.ObjectId(song),
            date: new Date()
        })
    })

    const playlist = new playlists(
        {
            name : inputSong.name,
            list_songs : arrSong
        },
    )
    const savePlaylist = await playlist.save()

    return savePlaylist
}

const getPlaylist = async (parent, {})=>{
    const get = playlists.find({})
    return get
}

module.exports = {insertPlaylist, getPlaylist}