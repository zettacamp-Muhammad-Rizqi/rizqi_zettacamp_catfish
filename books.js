// //expressjs start here
// const express = require('express')
// // const app = express()
const {app, express} = require('./express')
const port = 3000

//require express
const mongoose = require('mongoose')
const {bookShelfs} = require('./bookshelf')

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
app.get("/totalPrice",async(req,res)=>{

      const addField= await books.aggregate([
        {
          $addFields:{
            total_price:{
              $multiply:["$stock","$price"]
            }
          }
        },
        {
            $project :{_id:0, title:1, stock:1, price:1, total_price:1}
            
        }
      ])
      res.send(addField)
});

//MongoDB Day 6
//Filter using match, sort, and concat
app.post("/filterPrice",express.urlencoded({extended:true}),async(req,res)=>{
    let {price, sorting} = req.body;

    if(sorting==="ascending"){
        const priceFilter = await books.aggregate([
            {
                $match: {
                    price : parseInt(price)
                }
            },
            {
                $sort :{
                    title : 1
                }
            },
            {
                $project:{
                    _id:0,
                    book_Price:{
                        $concat:["$title", " by ", "$author"]
                    },
                    stock:1
                }
            }
        ])
        res.send(priceFilter)
    }else if(sorting==="descending"){
        const priceFilter2 = await books.aggregate([
            {
                $match: {
                    price : parseInt(price)
                }
            },
            {
                $sort :{
                    title : -1
                }
            },
            {
                $project:{
                    _id:0,
                    book_Price:{
                        $concat:["$title", " by ", "$author"]
                    },
                    stock:1
                }
            }
        ])
        res.send(priceFilter2)
    } else{
        res.send(Error)
    }
});

//lookup
app.get("/lookup",express.urlencoded({extended:true}),async(req,res)=>{
    const lookupBook = await bookShelfs.aggregate([
        {
            $lookup:{
                from : "books",
                localField : "book_id.list_id",
                foreignField : "_id",
                as : "list_book"
            }
        },
        {
            $project:{
                book_id:0,
                "list_book.createdAt":0,
                "list_book.updatedAt":0,
                "list_book.__v":0
            }
        } 
    ])
    res.send(lookupBook)
});

//pagination
app.post("/pagination",express.urlencoded({extended:true}),async(req,res)=>{
    let {page, limit} = req.body
    page = parseInt(page)-1 //start from zero
    limit = parseInt(limit)
    if(page<0){
        page = 1
    }
    const pagination = await books.aggregate([
        
        {
            $skip: page*limit
        },
        {
            $limit: limit
        },
        {
            $group: {
                _id: ["$title","$author","$stock"]
            }
        },
        {
            $addFields: {
                page: {
                    $sum: [

                        page, 1
                    ]
                }
            }
        }
    ])
    res.send(pagination)
});



//Listen port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
 })