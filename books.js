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

  //root the page that show data collections
app.get('/', express.urlencoded({extended:true}), async (req, res) => {
    const showData = await books.find()
    res.send(showData)
})
  
//insert the book to collection
app.post('/insertBook', express.urlencoded({extended:true}), async (req, res) => {
    const {title, author, price, stock} = req.body

    const book = new books(
        {
            title: title,
            author: author,
            date_published: new Date(),
            price: price,
            stock : stock
        }
    )
    const saveBook = await book.save()
    res.send(saveBook)
})

//aggregate addFields for multiply stock and price
app.get("/addFields",async(req,res)=>{

      const addField= await books.aggregate([
        {
          $addFields:{
            total_price:{
              $multiply:["$stock","$price"]
            }
          }
        }
      ])
      res.send(addField)
});

//aggregate with project
app.post("/project",async(req,res)=>{
    const {find} = req.body
    if(find){
        const findTitle = await books.aggregate([
            {
                $match:{
                    title: find
                }
            }
        ])
        res.send(findTitle)
    }else{
        const findTitle2 = await books.aggregate([
            {
                $project:{
                    title:1, date_published:1
                }
            }
        ])
        res.send(findTitle2)
    }
});

//Listen port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})