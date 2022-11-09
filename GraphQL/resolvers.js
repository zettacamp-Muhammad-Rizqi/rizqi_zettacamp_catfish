//Import source
const {registUser} = require('../src/Users/regist.users')
const {updateUser} = require('../src/Users/update.users')
const {getOneUser} = require('../src/Users/getOne.users')
const {getAllUser} = require('../src/Users/getAll.users')

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        GetAllUser: getAllUser,
        GetOneUser: getOneUser,
    },
    Mutation: {
        CreateUser : registUser,
        UpdateUser : updateUser
    },
  };

  module.exports = {resolvers}