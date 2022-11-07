//Require model
const {songs, playlists} = require('../model')

// Provide resolver functions for schema fields
const resolvers = {
    Query: {
      getSongs: async () => {
          let result = await songs.find({})
          return result
      }
    },
  };

  module.exports = {resolvers}