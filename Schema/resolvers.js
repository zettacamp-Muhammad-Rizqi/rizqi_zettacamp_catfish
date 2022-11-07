// Provide resolver functions for your schema fields
const { ApolloError } = require('apollo-server-express');
const { default: mongoose } = require('mongoose');
const {books, bookShelfs, users} = require('../model')
const jwt = require('jsonwebtoken')

// const getBookShelfLoader = async function (parent, args, context) {
//   if (parent.created_by) {
//       return await context.PlaylistCreatedByLoader.load(parent.created_by);
//   };
// };

getBookShelves = async (parent ,args, context) =>{
  console.log(parent)
  if(parent.book_id){
    return await context.bookShelfLoader.load(parent.book_id)
  }
}

const resolvers = {
    Query: {
      getAllBooks: async (_, {skip, limit}) => {  
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
      },

      getAllBookShelves: async (_,)=>{
        const read = await bookShelfs.find({})
        return read
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
        console.log(book)
        const saveBook = await book.save()
        console.log(saveBook)
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
          }
        )
        return deleteBook
      },

      buyBook: async (_,{_id, discount, tax, manyBuy})=>{
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
          },
          {
            $addFields:{
              manyBuy: manyBuy
            }
          },
          {
            $addFields: {
              total_price : {
                $multiply: ["$price_after_discount", manyBuy]
              }
            }
          },
          {
            $project:
            {
              _id:1, title:1, author:1, date_published:1, price:1, amount_Of_Discount:1, amount_Of_Tax:1, price_after_discount:1, price_after_tax:1, manyBuy:1, total_price:1,
              stock: {
                $subtract:["$stock", manyBuy]
              }
            }
          }
          // {
          //   $addFields: {
          //     stock_left: {
          //       $subtract: ["$stock", manyBuy]
          //     }
          //   }
          // }
        ])
        // console.log(buyBook)
        return buyBook
      },
      
      // registerUser: async (_, {registerInput:{username, email, password}}) =>{
      //   const oldUser = await users.findOne({email})

      //   //if already have return ApolloError
      //   if(oldUser){
      //     throw new ApolloError('A user is already registered with the email'+ email, 'User Already Exists')
      //   }

      //   //encrypted password
      //   let encryptedPassword = await bcrypt.hash(password, 10)


      //   const newUser = new users(
      //     {
      //       username: username,
      //       email: email.toLowerCase(),
      //       password: encryptedPassword
      //     }
      //   )

      //   //create JWT to Attach into model
      //   const token = jwt.sign(
      //     {
      //       user_id: newUser._id, email
      //     },
      //     "UNSAFE_STRING",
      //     {
      //       expiresIn: "2h"
      //     }
      //   )

      //   newUser.token = token;
        
      //   const userSave = await newUser.save();
      //   return {
      //     id: userSave.id,
      //     ...userSave._doc
      //   }
      // },
      // loginUser: async (_, {loginInput:{email, password}})=>{
      //   const user = await users.findOne({email})

      //   if(user && (await bcrypt.compare(password, user.model))){
      //     //Make a new token
      //     const token = jwt.sign(
      //       {
      //         user_id: newUser._id, email
      //       },
      //       "UNSAFE_STRING",
      //       {
      //         expiresIn: "2h"
      //       }
      //     )
          
      //     user.token = token

      //     return {
      //       id: user.id,
      //       ...user._doc
      //     }
      //   }
      // }
    },



    BookId: {
      list_id: getBookShelves
    }

  };

  module.exports = {resolvers}