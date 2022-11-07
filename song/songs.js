//Song Model
const {songs} = require('../model')

const songGetAll = async (_,{skip, limit})=>{
    const getSongs = await songs.aggregate([
        {
            $project: {
                _id:1,
                title:1,
                artist:1,
                duration:1,
                genre:1
            }
        },
        {
            $skip: skip*limit
        },
        {
            $limit: limit
        }
    ])
    return getSongs
    
}

const insertNewSong = async (_,{title, artist, duration, genre})=>{
    const song = new songs(
        {
            title: title,
            artist: artist,
            duration: duration,
            genre: genre
        }
    )
    const saveSong = await song.save()
    return saveSong
}

const songUpdate = async (_,{_id, title, artist, duration, genre})=>{
    const update = await songs.findByIdAndUpdate(
        {
          _id : _id
        },
        {
          $set : {
            title : title,
            artist : artist,
            duration: duration,
            genre : genre
          }
        },
        {
          new: true
        }
    )
    return update
}

const songDelete = async (_, {_id})=>{
    const removeSong = await songs.findByIdAndDelete(
        {
            _id : _id
        }
    )
    return removeSong
}


module.exports = {
    songGetAll,
    insertNewSong,
    songUpdate,
    songDelete
}