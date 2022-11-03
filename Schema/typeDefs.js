const { gql} = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Book {
    _id: ID,
    title: String,
    author: String,
    date_published: String,
    price: Int,
    stock: Int,
  }

  type Mutation{
    addBook(
      title: String,
      author: String,
      price: Int,
      stock: Int,
    ) : Book

    updateBook(
      _id : ID,
      title: String,
      author: String,
      price: Int,
      stock: Int
    ) : Book

    deleteBook(
      _id : ID,
    ) : Book
  }

  type Query{
    getAllBooks(
      skip : Int,
      limit: Int
    ): [Book]
    
    getBooksPrice (
      _id :ID,
      title: String,
      price : Int,
      skip : Int,
      limit : Int
    ) : [Book]
  }
`;

//harus declare dulu kalau enum

module.exports = {typeDefs}