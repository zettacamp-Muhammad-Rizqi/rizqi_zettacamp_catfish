//Make object
const book = {
    title : "Detective Conan The Scarlet Alibi",
    available : true,
    price : 100000,
    tax : 12,
    discount : 30,
    stock : 3,
    purchased : 2,
    isCredit : true,
    creditMonth : 6,
    credit : [],
}

//Destructuring object
let {creditMonth} = book

let discountPrice = book.price*(book.discount/100)
let taxPrice = book.price*(book.tax/100)
let bookPriceDiscount= book.price - discountPrice
let bookPriceTax = bookPriceDiscount + taxPrice

//Price a month for credit
let payForMonth = bookPriceTax/creditMonth

//Condition for use credit or not
if(book.isCredit==true){
    buyWithCredit(book)
}
else{
    buyBook(book)
}

//Normal without credit balance
function buyBook(buku){
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

    console.log("Amount of Discount = "+discountPrice)
    console.log("Price after Discount = "+bookPriceDiscount)
    console.log("Amount of Tax = "+taxPrice)
    console.log("Price after tax = "+bookPriceTax)
    console.log("Total you must pay is "+totalPay)
    book.stock > 0 ? console.log("Amount of book after purchasing can be purchased again") : console.log("Amount of book after purchasing can't be purchased again")
}

//function push data into credit
function buyWithCredit(buku){
    let payCredit=0
    for(let i=1; i<=buku.creditMonth; i+=1){
        payCredit+=payForMonth
        // buku.credit.push(payCredit)
        buku.credit.push({
            month : i,
            payMonth : payForMonth,
            totalPayMonth : payCredit,
        })
    }
    console.log(...buku.credit)
}