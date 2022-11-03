// Provide resolver functions for your schema fields
const {books} = require('../model')
const resolvers = {
    Query: {
      getBooks: async () => {  
        const result = await books.find({})
        return result
      },
      getBooksPrice: async (_, {_id, price, title, author, skip, limit}) =>{
        const findBook = await books.aggregate([
          {
            $match : {
              _id : _id,
              title : title,
              author: author,
              price : price,
            }
          },
          {
            $skip : skip*limit
          },
          {
            $limit : limit
          }
        ])
        return findBook
      }
    },

    Mutation: {
      addBook: async (_, {title, author, price, stock})=>{
        const book = new books(
          {
            title : title,
            author: author,
            date_published : new Date(),
            price : price,
            stock : stock
          }
        )
        const saveBook = await book.save()
        return saveBook
      },

      updateBook: async (_, {_id, title, author, price, stock})=>{
        const updateBook = await books.findByIdAndUpdate(
          {
            _id : _id
          },
          {
            $set : {
              title : title,
              author : author,
              price: price,
              stock: stock
            }
          },
          {
            new: true
          }
        )
        return updateBook
      },

      deleteBook: async (_, {_id})=>{
        const deleteBook = await books.findByIdAndDelete(
          {
            _id : _id
          },
          {new: true}
        )
        return deleteBook
      }
    }
  };

  module.exports = {resolvers}