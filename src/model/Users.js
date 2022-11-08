const mongoose = require('mongoose')

//Book Shema
const userSchema = new mongoose.Schema(
    {
        password: String,
        email: {type: String, unique:true},
        last_name: String,
        first_name: String,
        status : {type: String, enum:["active", "deleted"], default: "active"}
    },
    {timestamps : true}
  )
    
const users = mongoose.model("users", userSchema);

module.exports = {users}