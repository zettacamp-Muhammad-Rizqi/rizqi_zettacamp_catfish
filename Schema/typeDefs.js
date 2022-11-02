const { gql} = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Book {
    _id: ID,
    title: String,
    author: String,
    date_published: Int,
    price: Int,
    stock: Int
  }
  type Query{
    getBooks : [Book]
  }
`;

module.exports = {typeDefs}