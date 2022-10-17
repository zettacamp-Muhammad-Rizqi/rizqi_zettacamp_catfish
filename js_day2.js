//expressjs start here
const express = require('express')
const app = express()
const port = 3000


app.get('/', authentication, (req, res)=>{
    res.send(book)
})

app.get('/buyCredit', authentication, (req, res) => {
    buyBook(book, false)
    res.send(book)
})




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
//Make object
const book = {
    title : "Detective Conan The Scarlet Alibi",
    available : true,
    price : 100000,
    tax : 12,
    discount : 30,
    stock : 2,
    purchased : 3,
    creditMonth : 6,
    credit : [],
    bill : [],
}

function buyBook(buku, isCredit){
    let {creditMonth} = book //Destructuring object to make creditMonth from the book too make local variabel
    let discountPrice = buku.price*(buku.discount/100) //count the discount price
    let taxPrice = buku.price*(buku.tax/100) // count the tax price
    let bookPriceDiscount= buku.price - discountPrice //count the book after get discount
    let bookPriceTax = bookPriceDiscount + taxPrice // count the book after get discount and get tax

    if(isCredit==true){
        let payForMonth = Math.round(bookPriceTax/creditMonth)
        let payCredit=0
        for(let i=1; i<=buku.creditMonth; i+=1){
            payCredit+=payForMonth
            buku.credit.push({
                month : i,
                payMonth : payForMonth,
                totalPayMonth : payCredit,
            })
        }
        console.log(...buku.credit)
    }
    else{
        let totalPay = 0;
        for(let i=1; i<=buku.purchased; i++){
            if(buku.available){
                totalPay +=bookPriceTax;
                buku.stock -=1
                if(buku.stock<=0){
                    buku.available = false
                    break;
                }
            }
        }

        buku.bill.push({
            amountOfDiscount : discountPrice,
            priceAfterDiscount : bookPriceDiscount,
            amountOfTax : taxPrice,
            priceAftertax : bookPriceTax,
            "Total you must pay is" : totalPay,
        })

        if (book.stock > 0 == true){
            buku.bill.push("Amount of book after purchasing can be purchased again")
        }else{
            buku.bill.push("Amount of book after purchasing can't be purchased again")
        }
    }
    
}