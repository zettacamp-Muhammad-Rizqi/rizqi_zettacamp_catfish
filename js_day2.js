//expressjs start here
const express = require('express')
const app = express()
const port = 3000

//Make object
const book = {
    title : "Detective Conan The Scarlet Alibi",
    available : true,
    price : 100000,
    tax : 12,
    discount : 30,
    // stock : 3,
    // purchased : 2,
    // creditMonth : 6,
    // credit : [],
    // bill : [],
}

//root page
app.get('/', authentication, (req, res)=>{
    res.send(book)
})

//Events
// const Events = require('events')
// const myEvents = new Events()

// myEvents.on('program_start', (message)=>{
//     console.log(`Program is beginning, ${message}`)
// })
// myEvents.emit('program_start', 'Rizqi') // fire or trigger

// //GET 'buku.txt' route async with await
// const fs = require('fs/promises')
// app.get('/readbuku', authentication, async (req, res)=>{
//     try{
//         let data = await fs.readFile('./buku.txt', {encoding:'utf-8'})
//         console.log(data)
//         res.send(data)
//     }catch(err){
//         console.log("Get an Error!")
//         res.send(err)
//     }
// })

// //no await
// app.get('/readbukuNoAwait', authentication, (req, res)=>{
//     let data = fs.readFile('./buku.txt', {encoding:'utf-8'})
//     data
//         .then((result)=>{
//             console.log(result)
//             res.send(result)
//         })    
//         .catch((err)=>{
//             console.log("Get an Error!")
//             res.send(err)
//         })
// })


//GET credit with async await
// app.get('/buyCredit', authentication, async(req, res) => {
    
//     let newBook = buyBook(book)
//     console.log(newBook)
//     newBook = await calculateCredit(book)
//     res.send(book)
// })

//Make new Map for new object
const titleMap = new Map()
titleMap.set("Ultraman", {...book, title:"Ultraman"})
titleMap.set("Matematika", {...book, title:"Matematika"})
titleMap.set("IPS", {...book, title:"IPS"})
titleMap.set("IPA", {...book, title:"IPA"})
// console.log(titleMap.get("IPS"))
// new Set for new object
const titleSet = new Set(["Ultraman", "Matematika", "IPS"])

app.get('/result', authentication, (req, res) => {
    res.send([...titleMap])
})

app.post('/resultAdd', authentication, (req, res) => {
    const {title} = req.query
    if(!title){
        res.send("No find the title!!!")
    }

    if(titleSet.has(title)){ //has to get a value true if have a value
        res.send(`${title} has add to list`) //cek the title if have a duplicate
    }else{
        titleMap.set(title,{...book,title})//to set new Map for POST
        titleSet.add(title); //set to add new title
        res.send(titleMap.get(title));//respon ke postman
    }
})


//Authentication Basic
function authentication(req, res, next){
    const userName = 'rizqi'
    const password = 'rizqi01'
    let authheader = req.headers.authorization;
    //console.log(req.headers.authorization);

    if (!authheader){
        res.send("No Authentication :(");
        res.end();
    } else {
        let auth = new Buffer.from(authheader.split(' ')[1],'base64').toString().split(':');
        let user = auth[0];
        let pass = auth[1];
       
        if (user == userName && pass == password) {
 
            // If Authorized user
            // console.log("Succes Authentication")
            next();
        } else {
            res.send("You can't Authentication");
            res.end();
        }
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

// //Calculate credit Month
// async function calculateCredit(buku, additionMonth=600, _month=3){
//     let {creditMonth} = book //Destructuring object to make creditMonth from the book too make local variabel
//     let fixPrice = buku.bill[0].priceAftertax

//     let payForMonth = Math.round(fixPrice/creditMonth)
//     let payCredit=0
//     let arrayCredit = []
//     for(let i=1; i<=creditMonth; i+=1){
//         payCredit+=payForMonth
//         if(i===_month){
//             payForMonth+=additionMonth
//             arrayCredit.push({
//                 month : i,
//                 payMonth : payForMonth,
//                 totalPayMonth : payCredit,
//             })
//         }else{
//             arrayCredit.push({
//                 month : i,
//                 payMonth : payForMonth,
//                 totalPayMonth : payCredit,
//             })
//         }
//     }
//     buku.credit = arrayCredit
//     return buku

// }

// function buyBook(buku){
    
//     let discountPrice = buku.price*(buku.discount/100) //count the discount price
//     let taxPrice = buku.price*(buku.tax/100) // count the tax price
//     let bookPriceDiscount= buku.price - discountPrice //count the book after get discount
//     let bookPriceTax = bookPriceDiscount + taxPrice // count the book after get discount and get tax

//     let totalPay = 0;
//     for(let i=1; i<=buku.purchased; i++){
//         if(buku.available){
//             totalPay +=bookPriceTax;
//             buku.stock -=1
//             if(buku.stock<=0){
//                 buku.available = false
//                 break;
//             }
//         }
//     }

//     buku.bill.push({
//         amountOfDiscount : discountPrice,
//         priceAfterDiscount : bookPriceDiscount,
//         amountOfTax : taxPrice,
//         priceAftertax : bookPriceTax,
//         "Total you must pay is" : totalPay,
//     })

//     if (book.stock > 0 == true){
//         buku.bill.push("Amount of book after purchasing can be purchased again")
//     }else{
//         buku.bill.push("Amount of book after purchasing can't be purchased again")
//     }
//     return buku
// }