//require express
const {app, express, port} = require('./express')

const mongoose = require('mongoose')
const {books, bookShelfs} = require('./model')

//Mongose Connections
async function connected(){
    await mongoose.connect('mongodb://localhost:27017/zettacamp_batch3');
}
connected()


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

//MongoDB Day 7 pagination
app.post("/pagination",express.urlencoded({extended:true}),async(req,res)=>{
    let {page, limit} = req.body

    page = parseInt(page)-1 //start from zero
    limit = parseInt(limit)
    //PR page nya kurang pas masih, saran page ga usah
    if(page<0){
        page = 1 // the page start from 1
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

//facet
app.get("/facet",express.urlencoded({extended:true}),async(req,res)=>{
    const facet = await books.aggregate([
        {
           $facet: {
            "category_by_price": [
                {
                    $group:{
                   _id: "$price",
                   title: {
                       $push: "$title"
                   },
                   many : {
                       $sum: 1
                   }
                  }
                }
            ]
           }
        }
    ])
    res.send(facet)
});

/* **********BookShelf************ */
//Book Shelf Show Data
app.get('/bookShelf', express.urlencoded({extended:true}), async (req, res) => {
    const showBookShelf = await bookShelfs.find()
    res.send(showBookShelf)
})

//Insert the bookShelf with array push
app.post('/insertShelf', express.urlencoded({extended:true}), async (req, res) => {
    const {number_shelf,category,book_id, stock, time} = req.body
    const splitBook = book_id.split(',')
    //make array for save id books
    let arrBook = []
    
    //split stock
    let stockArr = stock.split(',')
    
    splitBook.forEach((book,index)=>{
        arrBook.push({
            list_id: mongoose.Types.ObjectId(book),
            stock:stockArr[index],
            date: new Date()
        })
    })

    const shelf = new bookShelfs(
        {
            number_shelf : number_shelf,
            category: category,
            book_id : arrBook,
            add : [
                {
                    time : time,
                    date_add : new Date()
                }
            ]
        },
        )
        const saveShelf = await shelf.save()
        res.send(saveShelf)
})

//Filter using elemMatch
app.post('/filterShelf', express.urlencoded({extended:true}), async (req, res) => {
    const {list_id} = req.body
    // const splitId = list_id.split(',')
    const filterShelf = await bookShelfs.find(
        {
            book_id : {
                $elemMatch : {
                    list_id : {
                        $in : list_id
                    }
                }
            }
        }
    )
    res.send(filterShelf)
})

//Test Dintinct for look the unique value
app.get('/distinct', express.urlencoded({extended:true}), async (req, res) => {
    const filterDistinct = await bookShelfs.distinct("book_id.list_id")
    res.send(filterDistinct)
})

//update the data inside and array of objects using arrayFilter
app.put('/updateDate', express.urlencoded({extended:true}), async (req, res) => {
    let {shelf_id, new_date, arr_Filter} = req.body
    shelf_id = mongoose.Types.ObjectId(shelf_id)

    const tanggal = new Date(new_date);
    const tanggal_arr = new Date(arr_Filter);

    const updateDate = await bookShelfs.updateOne(
        {_id : shelf_id},
        {
            $set : {
                "book_id.$[element].date" : tanggal
                
            }
            
        },
        {
            arrayFilters: [
                {
                    "element.date": {
                        $lte : tanggal_arr
                    }
                }
            ]
        }
    )
    res.send(updateDate)
})

//Update date_add Error Fixed
app.put('/updateAddDate', express.urlencoded({extended:true}), async (req, res) => {
    let {shelf_add, new_dateAdd, filterAdd} = req.body
    shelf_add = mongoose.Types.ObjectId(shelf_add)

    console.log(shelf_add)
    // return

    const date_new = new Date(new_dateAdd);
    const date_filter = new Date(filterAdd);

    const updateDateAdd = await bookShelfs.updateOne(
        {_id : shelf_add},
        {
            $set : {
                "add.$[element].date_add" : date_new
                
            }
            
        },
        {
            arrayFilters: [
                {
                    "element.date_add": {
                        $lte : date_filter
                    }
                }
            ]
        }
    )
    res.send(updateDateAdd)
})

//aggregate with unwind
app.get("/unwind",async(req,res)=>{
    const unwind = await bookShelfs.aggregate([
        {
            $unwind : "$book_id"
        },
        {
            $project : {
                book_id:1,
                _id:0
            }
        }
    ])
    res.send(unwind)
});



//Listen port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
 })