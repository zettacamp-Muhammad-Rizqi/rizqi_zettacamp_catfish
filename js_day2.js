//expressjs start here
const express = require('express')
const app = express()
const port = 3000

//mongoose start here
const mongoose = require('mongoose')
const bookShelfs = require('./bookshelf')

//import bookshelf
const importShelf = require('./bookshelf')
importShelf

async function connected(){
    await mongoose.connect('mongodb://localhost:27017/zettacamp_batch3');
}
connected()

const bookSchema = new mongoose.Schema({
    title: String,
	author: String,
	date_published: Date,
	price: Number,
	created_At: Date,
	updated_At: Date
  })
    
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

                    //For bookShelf
//Insert the bookShelf
app.post('/insertShelf', express.urlencoded({extended:true}), async (req, res) => {
    const {number_shelf,category,book_id} = req.body

    const insertShelf = await bookShelfs.collection.insertOne(
        {
            number_shelf,
            category,
            book_id : book_id.split('\n'),
            created_At : new Date()
        }
    )

    const bookShelf = await bookShelfs.findById(insertShelf.insertedId.toString())

    res.send(bookShelf)
})
//Book Shelf Show Data
app.get('/bookShelf', express.urlencoded({extended:true}), async (req, res) => {
    const showBookShelf = await bookShelfs.find()
    res.send(showBookShelf)
})
//Update Data Shelf
app.put('/updateShelf', express.urlencoded({extended:true}), async (req, res) => {
    const {id_shelf, newId} = req.body
    const updateBookShelf = await bookShelfs.findByIdAndUpdate(
        id_shelf,
        {
            updated_At : new Date(),
            newId : newId.split('\n')
        }, {
            new : true
        }
    )
    
    res.send(updateBookShelf)
})
//delete bookShelf
app.delete('/deleteShelf', express.urlencoded({extended:true}), async (req, res) => {
    const {remove_shelf} = req.body
    const deleteShelf = await bookShelfs.deleteOne(
        {
            _id : remove_shelf
        }
    )
    res.send(deleteShelf)
})



//Listen port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  