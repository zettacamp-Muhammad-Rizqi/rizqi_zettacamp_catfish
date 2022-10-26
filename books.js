//expressjs start here
const express = require('express')
const app = express()
const port = 3000

//mongoose start here
const mongoose = require('mongoose')

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

//Listen port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})