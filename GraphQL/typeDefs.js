const { gql} = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User{
    _id : ID,
    password : String,
    email : String,
    last_name : String,
    first_name : String,
    status : Status
  }

  type TokenUser {
    token : String
  }

  input RegistUser{
    password : String,
    email : String,
    last_name : String,
    first_name : String,
  }

  input UpdateTheUser{
    _id : ID,
    password : String,
    email : String,
    last_name : String,
    first_name : String,
  }

  input InputLogin{
    email : String,
    password : String
  }

  enum Status{
    active,
    deleted
  }

  type Ingredients{
    _id : ID,
    name : String,
    stock : Int,
    status : Status
  }

  input Ingredient{
    name : String,
    stock : Int
  }

  type Recipes{
    _id : ID,
    recipe_name : String,
    ingredients : [DetailIngredient],
    price : Int,
    status : Status
  }

  type DetailIngredient{
    ingredient_id : Ingredients,
    stock_used : Int
  }

  Input DataRecipe{
    recipe_name : String,
    ingredients : [ID],
    stock_used : Int,
    price : Int
  }

  type Query{
    GetAllUser (email:String, last_name:String, first_name:String, skip: Int, limit: Int): [User]
    GetOneUser (_id: ID, email: String): User
    GetOneIngredient (_id: ID): Ingr_edients
    GetAllIngredients (name: String, stock:Int, skip: Int, limit: Int) : [Ingredients]
  }

  type Mutation{
    CreateUser(register: RegistUser) : User
    UpdateUser(update: UpdateTheUser) : User
    DeleteUser(_id: ID) : User
    Login(input: InputLogin): TokenUser
    CreateIngredient(input: Ingredient) : Ingredients
    UpdateIngredient(_id:ID, stock: Int): Ingredients
    DeleteIngredient(_id:ID): Ingredients
    CreateRecipe(input: DataRecipe) : Recipes
  }
`;

module.exports = {typeDefs}