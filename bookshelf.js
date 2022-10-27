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

//Schema Shelf
const shelfSchema = new mongoose.Schema(
	{
		number_shelf : Number,
		category: String,
		book_id : [
			{
                _id:false,
                list_id : {
					type : mongoose.Schema.Types.ObjectId,
				},
                stock : Number,
                add : Date,
			},
			
			
		],
        time : String
  	},
  	{ timestamps : true} //update created At and update At to timestamps
)

//Model Schema
const bookShelfs = mongoose.model("bookShelf", shelfSchema);

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
            add: new Date()
        })
    })

    const shelf = new bookShelfs(
        {
            number_shelf : number_shelf,
            category: category,
            book_id : arrBook,
            time : time
        },
        )
        const saveShelf = await shelf.save()
        res.send(saveShelf)
})

//Filter using elemMatch
app.post('/filterShelf', express.urlencoded({extended:true}), async (req, res) => {
    const {list_id} = req.body
    const splitId = list_id.split(',')
    const filterShelf = await bookShelfs.find(
        {
            book_id : {
                $elemMatch : {
                    list_id : {
                        $in : splitId
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



//Listen port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})