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
    price_after_tax: Int,
    manyBuy: Int,
    total_price: Int,
  }

  type BookId{
    list_id: ID,
    stock: Int,
    date: String
  }

  type AddShelf{
    time: String,
    date_add: String
  }

  type BookShelves{
    number_shelf: Int,
    category: String,
    book_id: [BookId],
    add : [AddShelf]
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

    buyBook(
      _id:ID,
      discount: Int,
      tax: Int,
      manyBuy: Int
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

    getBookShelves : [BookShelves]
  }
`;

module.exports = {typeDefs}