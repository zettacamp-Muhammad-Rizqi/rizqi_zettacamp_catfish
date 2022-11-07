const { gql} = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Song {
    _id : ID,
    title : String,
    artist : String,
    duration : Int,
    genre : String
  }

  type ListSong{
    songs_id: Song,
    date: String
  }

  input IdSong{
    songs_id : [ID]
  }

  input songData {
    name : String
    song_ids: [ID]
  }

  type Playlist{
    _id : ID,
    name : String,
    list_songs : [ListSong]
  }

  type Query{
    getAllSong (
        skip: Int,
        limit: Int
    ): [Song]
    getPlaylist:[Playlist]
  }

  type Mutation{
    addSong (
        title: String,
        artist: String,
        duration : Int,
        genre : String
    ) : Song

    updateSong(
        _id: ID,
        title: String,
        artist: String,
        duration : Int,
        genre : String
    ) : Song

    deleteSong(_id: ID) : Song
    
    addPlaylist(inputSong : songData) : Playlist
  }
`;

module.exports = {typeDefs}