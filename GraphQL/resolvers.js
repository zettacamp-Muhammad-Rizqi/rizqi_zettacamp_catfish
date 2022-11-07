//Require Functions
const {
    songGetAll,
    insertNewSong,
    songUpdate,
    songDelete,
    insertPlaylist,
} = require('../song/songs')

// Provide resolver functions for schema fields
const resolvers = {
    Query: {
      getAllSong : songGetAll
    },

    Mutation:{
        addSong : insertNewSong,
        updateSong : songUpdate,
        deleteSong : songDelete,
        addPlaylist : {insertPlaylist},
    }
  };

  module.exports = {resolvers}