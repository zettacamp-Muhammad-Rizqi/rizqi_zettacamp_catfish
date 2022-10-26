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

//Insert the bookShelf
app.post('/insertShelf', express.urlencoded({extended:true}), async (req, res) => {
    const {number_shelf,category,book_id, stock, time} = req.body
    const splitBook = book_id.split(',')
    //make array for save id books
    let arrBook = []
    
    //split stock
    let stockArr = stock.split(',').map((el) => {return parseInt(el)});
    console.log(stockArr)
    
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
            book_id
        }, 
		{
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
                $in : [filter]
            }
        },
    )
    res.send(filterShelf)
})

//Listen port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})