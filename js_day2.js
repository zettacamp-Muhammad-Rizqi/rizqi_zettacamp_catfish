//expressjs start here
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

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
        {clear}
    )
    res.send(deleteData)
})

// //JS_Day 8
// //Make new Map for new object
// const titleMap = new Map()
// titleMap.set("Ultraman", {...book, title:"Ultraman"})
// titleMap.set("Matematika", {...book, title:"Matematika"})
// titleMap.set("IPS", {...book, title:"IPS"})
// titleMap.set("IPA", {...book, title:"IPA"})
// // console.log(titleMap.get("IPS"))

// // new Set for new object
// const titleSet = new Set(["Ultraman", "Matematika", "IPS"])

// app.get('/result', authentication, (req, res) => {
//     res.send([...titleMap])
// })

// app.post('/resultAdd', authentication, (req, res) => {
//     const {title} = req.query
//     if(!title){
//         res.send("No find the title!!!")
//     }

//     if(titleSet.has(title)){ //has to get a value true if have a value
//         res.send(`${title} has add to list`) //cek the title if have a duplicate
//     }else{
//         titleMap.set(title,{...book,title})//to set new Map for POST
//         titleSet.add(title); //set to add new title
//         res.send(titleMap.get(title));//get respon to Postman
//     }
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })