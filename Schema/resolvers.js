// Provide resolver functions for your schema fields
const { default: mongoose } = require('mongoose');
const {books} = require('../model')
const resolvers = {
    Query: {
      getAllBooks: async (_, skip, limit) => {  
        const result = await books.aggregate([
          {
            $project: {
              _id:1, title:1, author:1, date_published:1, price:1, stock:1
            }
          },
          {
            $skip: skip*limit
          },
          {
            $limit: limit
          }
        ])
        return result
      },

      getBooksByMatch: async (_, {_id, title, price, skip, limit}) =>{
        const mathQuery = {
          $and : []
        }
        if(_id){
          mathQuery.$and.push({
            _id : mongoose.Types.ObjectId(_id)
          })
        }
        if(title){
          mathQuery.$and.push({title})
        }
        if(price){
          mathQuery.$and.push({price})
        }
        if(!_id && !title && !price){
          const findBook2 = await books.find({})
          return findBook2
        }

        const findBook = await books.aggregate([
          {
            $match: mathQuery
          },
          {
            $skip: skip*limit
          },
          {
            $limit: limit
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
      },

      buyBook: async (_,{_id, discount, tax})=>{
        const buyBook = await books.aggregate([
          {
            $match: {
              _id : mongoose.Types.ObjectId(_id)
            }
          },
          {
            $addFields: {
              amount_Of_Discount : {
                $multiply : [discount/100, "$price"]
              },
            }
          },
          {
            $addFields: {
              amount_Of_Tax: {
                $multiply : [tax/100, "$price"]
              }
            }
          },
          {
            $addFields: {
              price_after_discount: {
                $subtract: ["$price", "$amount_Of_Discount"]
              }
            }
          },
          {
            $addFields: {
              price_after_tax: {
                $sum: ["$price_after_discount", "$amount_Of_Tax"]
              }
            }
          }
        ])
        // console.log(buyBook)
        return buyBook
      }
    }
  };

  module.exports = {resolvers}