const { gql} = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User{
    _id : ID,
    password: String,
    email: String,
    last_name: String,
    first_name: String,
    status : Status
  }

  type TokenUser {
    token: String
  }

  input RegistUser{
    password: String,
    email: String,
    last_name: String,
    first_name: String,
  }

  input UpdateTheUser{
    _id: ID,
    password: String,
    email: String,
    last_name: String,
    first_name: String,
  }

  input InputLogin{
    email: String,
    password: String
  }

  enum Status{
    active,
    deleted
  }

  type Query{
    GetAllUser (email:String, last_name:String, first_name:String, skip: Int, limit: Int): [User]
    GetOneUser (_id: ID, email: String): User
  }

  type Mutation{
    CreateUser(register: RegistUser) : User
    UpdateUser(update: UpdateTheUser) : User
    DeleteUser(_id: ID) : User
    Login(input: InputLogin): TokenUser
  }
`;

module.exports = {typeDefs}