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

  input RegistUser{
    password: String,
    email: String,
    last_name: String,
    first_name: String,
  }

  enum Status{
    active,
    deleted
  }

  type Query{
    getUser : [User]
  }

  type Mutation{
    registNewUser(register: RegistUser) : User
  }
`;

module.exports = {typeDefs}