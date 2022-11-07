const mongoose = require('mongoose')

//Book Shema
const bookSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        date_published: Date,
        price: Number,
        stock : Number
    },
    {timestamps : true}
  )
    
const books = mongoose.model("books", bookSchema);

//Schema Shelf
const shelfSchema = new mongoose.Schema(
	{
		number_shelf : Number,
		category: String,
		book_id : [
			{
                _id:false,
                list_id : {
					type : mongoose.Types.ObjectId,
				},
                stock : Number,
                date : Date,
			},
			
			
		],
        add : [
            {
                time : String,
                date_add : Date
            }
        ]
  	},
  	{ timestamps : true} //update created At and update At to timestamps
)

const bookShelfs = mongoose.model("bookShelf", shelfSchema);

//User Model
const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
        token: String
    },
    {timestamps:true}
)

const users = mongoose.model("users", userSchema)

module.exports = {books, bookShelfs, users}