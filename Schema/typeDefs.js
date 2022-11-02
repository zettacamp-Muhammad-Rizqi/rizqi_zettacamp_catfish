const { gql} = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Book {
    _id: ID,
    title: String,
    author: String,
    date_published: Int,
    price: Int,
    stock: Int,
    status : enumBook
  }
  enum enumBook{ 
    active
    deleted
  }
  type Query{

    getBooks : [Book]
  }
`;

//harus declare dulu kalau enum

module.exports = {typeDefs}