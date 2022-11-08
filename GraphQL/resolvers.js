//Import source
const {registUser} = require('../src/Users/regist.users')

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {},
    Mutation: {
        registNewUser : registUser
    },
  };

  module.exports = {resolvers}