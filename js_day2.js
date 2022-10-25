//expressjs start here
const express = require('express')
const app = express()
const port = 3000

//mongoose start here
const mongoose = require('mongoose')
const { findById } = require('./bookshelf')
const bookShelfs = require('./bookshelf')

//import bookshelf
const importShelf = require('./bookshelf')

//Mongose Connections
async function connected(){
    await mongoose.connect('mongodb://localhost:27017/zettacamp_batch3');
}
connected()

//Book Shema
const bookSchema = new mongoose.Schema({
    title: String,
	author: String,
	date_published: Date,
	price: Number,
  },
  {timestamps : true}
  )
    
  const books = mongoose.model("books", bookSchema);

  //root the page that show data collections
app.get('/', express.urlencoded({extended:true}), async (req, res) => {
    const showData = await books.find()
    res.send(showData)
})

//find command
app.post('/find', express.urlencoded({extended:true}), async (req, res) => {
    const {find} = req.body
    const findData = await books.findOne(
        {
            title : find
            // _id : find //remove the comment and make title comment if want to use
        }
    )
    res.send(findData)
})
  
//insert the book to collection
app.post('/insertBook', express.urlencoded({extended:true}), async (req, res) => {
    const {title, author, birth, price} = req.body

    const insert = await books.collection.insertOne(
        {
            title,
            author,
            birth,
            price,
            created_At : new Date()
        }
    )

    const book = await books.findById(insert.insertedId.toString())

    res.send(book)
})

//update book command
app.put('/update', express.urlencoded({extended:true}), async (req, res) => {
    const {id, newTitle} = req.body
    const updateData = await books.findByIdAndUpdate(
        id,
        {
            updated_At : new Date(),
            title : newTitle
        }, {
            new : true
        }
    )
    
    res.send(updateData)
})

//delete command
app.delete('/delete', express.urlencoded({extended:true}), async (req, res) => {
    const {clear} = req.body
    const deleteData = await books.deleteOne(
        {
            clear
        }
    )
    res.send(deleteData)
})

 /**********************For bookShelf*****************************/
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

    const splitBook = book_id.split('\n') //disarankan oleh Mentor
    // console.log(splitBook.map(param=> mongoose.Types.ObjectId(param)))
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


//Listen port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  