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
    amount_Of_Discount: Int,
    amount_Of_Tax: Int,
    price_after_discount: Int,
    price_after_tax: Int
  }

  type Mutation{
    addBook(
      title: String,
      author: String,
      price: Int,
      stock: Int,
    ) : [Book]

    updateBook(
      _id : ID,
      title: String,
      author: String,
      price: Int,
      stock: Int
    ) : [Book]

    deleteBook(
      _id : ID,
    ) : [Book]

    buyBook(
      _id:ID,
      discount: Int,
      tax: Int,
    ) : [Book]
  }

  type Query{
    getAllBooks(
      skip : Int,
      limit: Int
    ): [Book]

    getBooksByMatch(
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