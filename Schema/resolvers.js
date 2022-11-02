// Provide resolver functions for your schema fields
const {books} = require('../model')
const resolvers = {
    Query: {
      getBooks: async () => {
          let result = await books.find({})
          return result
      }
    },
  };

  module.exports = {resolvers}