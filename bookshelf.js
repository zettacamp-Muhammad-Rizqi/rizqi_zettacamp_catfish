//mongoose start here
const mongoose = require('mongoose')

const shelfSchema = new mongoose.Schema({
    number_shelf : Number,
	category: String,
	book_id : [
		{
			type : mongoose.Schema.Types.ObjectId
		}
	],
  },
 { timestamps : true} 
  )
    
  const bookShelfs = mongoose.model("bookShelf", shelfSchema);

  module.exports = bookShelfs
