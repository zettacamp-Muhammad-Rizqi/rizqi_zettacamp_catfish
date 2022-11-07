//import dataloader
const DataLoader = require('dataloader')

//import model book
const {books} = require('./model')


const loadBook = async function (book_id){
    const bookList = await books.find({
        _id:{
            $in: book_id
        }
    })

    //create Map for book
    const bookMap = {}
    
    //insert data to bookMap with index
    bookList.forEach((book) => {
        bookMap[book._id] = book
    });

    return book_id.map(id=>bookMap[id])
}

const bookShelfLoader = new DataLoader(loadBook)
module.exports = bookShelfLoader;