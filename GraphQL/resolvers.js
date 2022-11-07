//Require model
const {songs, playlists} = require('../model')
const {
    songGetAll,
    insertNewSong,
    songUpdate,
    songDelete
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
    }
  };

  module.exports = {resolvers}