//import Book Schema
const books = require('./books')

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

//Insert the bookShelf
app.post('/insertShelf', express.urlencoded({extended:true}), async (req, res) => {
    const {number_shelf,category,book_id} = req.body

    // const insertShelf = await bookShelfs.collection.insertOne(
    //     {
    //         number_shelf,
    //         category,
    //         book_id : book_id.split('\n'),
    //     }
    // )
    // const bookShelf = await bookShelfs.findById(insertShelf.insertedId.toString())
    // res.send(insertShelf)

	//disarankan oleh Mentor
    const splitBook = book_id.split('\n') 
    const shelf = new importShelf(
        {
            number_shelf : number_shelf,
            category : category,
            book_id: splitBook.map(param=> mongoose.Types.ObjectId(param))
        }

    )
    const saveShelf = await shelf.save()
    res.send(saveShelf)
})
//Book Shelf Show Data
app.get('/bookShelf', express.urlencoded({extended:true}), async (req, res) => {
    const showBookShelf = await bookShelfs.find()
    res.send(showBookShelf)
})
//Update Data Shelf
app.put('/updateShelf', express.urlencoded({extended:true}), async (req, res) => {
    const {id_shelf, book_id} = req.body
    const updateBookShelf = await bookShelfs.findByIdAndUpdate(
        id_shelf,
        {
            updated_At : new Date(), //PR Hilangin
            book_id
        }, {
            new : true //data yang baru dioutput
        }
    )
    
    res.send(updateBookShelf)
})
//delete bookShelf
app.delete('/deleteShelf', express.urlencoded({extended:true}), async (req, res) => {
    const {id_book} = req.body
    // const deleteShelf = await bookShelfs.findByIdAndDelete(id_shelf)
    const deleteBook = await bookShelfs.deleteOne(
        {
            book_id : mongoose.Types.ObjectId(id_book)
        }
    )
    res.send(deleteBook)
})
//filter
app.post('/filter', express.urlencoded({extended:true}), async (req, res) => {
    const {filter} = req.body
    const filterShelf = await bookShelfs.find(
        {
            book_id : {
                $in : [filter.toString()]
            }
        },
    )
    res.send(filterShelf)
    // console.log(typeof filter)
    
})
