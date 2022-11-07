//import dataloader
const DataLoader = require('dataloader')

//import model book
const {songs} = require('../model')


const loadSong = async function (songs_id){
    // console.log(songs_id)
    const songList = await songs.find({
        _id:{
            $in: songs_id
        }
    })

    //create Map for book
    const songMap = {}
    
    //insert data to bookMap with index
    songList.forEach((song) => {
        songMap[song._id] = song
    });

    return songs_id.map(id=>songMap[id])
}

const songLoader = new DataLoader(loadSong)
// console.log(songLoader)
module.exports = songLoader;