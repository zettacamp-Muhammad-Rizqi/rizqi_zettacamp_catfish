//Import source
const {registUser} = require('../src/Users/regist.users')
const {updateUser} = require('../src/Users/update.users')
const {getOneUser} = require('../src/Users/getOne.users')
const {getAllUser} = require('../src/Users/getAll.users')
const {deleteUser} = require('../src/Users/delete.users')
const {loginUser} = require('../src/Users/login.users')
const {createIngredient} = require('../src/Ingredients/create.ingredients')

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        GetAllUser: getAllUser,
        GetOneUser: getOneUser,
    },
    Mutation: {
        CreateUser : registUser,
        UpdateUser : updateUser,
        DeleteUser : deleteUser,
        Login : loginUser,
        CreateIngredient : createIngredient,
    },
  };

  module.exports = {resolvers}