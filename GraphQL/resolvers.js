//Require Functions
const {
    songGetAll,
    insertNewSong,
    songUpdate,
    songDelete,
} = require('../song/songs')

const {insertPlaylist} = require('../playlist/playlists')

const {
    getPlaylist,
}= require('../playlist/playlists')

const getSonglistDataLoader = async function (parent, args, context) {
    console.log( await context.songLoader.load(parent.songs_id))
    if (parent.songs_id) {    
        return await context.songLoader.load(parent.songs_id);
    }
}
console.log(getPlaylist)
// Provide resolver functions for schema fields
const resolvers = {
    Query: {
      getAllSong : songGetAll,
      getPlaylist: getPlaylist
    },

    Mutation:{
        addSong : insertNewSong,
        updateSong : songUpdate,
        deleteSong : songDelete,
        addPlaylist : insertPlaylist,
    },
    
    ListSong:{
        songs_id : getSonglistDataLoader
    }
  };

  module.exports = {resolvers}