const { gql} = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Song {
    title: String,
    artist: String,
    duration : Int,
    genre : String
  }

  type Query{
    getSongs : [Song]
  }
`;

module.exports = {typeDefs}