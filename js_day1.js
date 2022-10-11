// Test include the object and declare the property
const book = {
    title : "Detective Conan The Scarlet Alibi",
    enable : true,
    price : 100000,
    tax : 12,
    discount : 30,
}
//Below is the declaration of the variable without using object and property
// const titleOfBook= "Detective Conan The Scralet Alibi"
// let enable = true
// let price = 100000
// let tax = 12
// let discount = 30


function amountOfDiscount(){
    let discountPrice = book.price*(book.discount/100)
    console.log("Amount Of Discount = "+discountPrice)
    return discountPrice
}

function amountOfTax(){
    let taxPrice = book.price*(book.tax/100)
    console.log("Amount of Tax = "+taxPrice)
    return taxPrice
}

function priceAfterDiscount(){
    let bookPriceDiscount
    bookPriceDiscount= book.price - amountOfDiscount()
    console.log("Price book after discount = "+bookPriceDiscount)
    return bookPriceDiscount
}
function priceAfterTax(){
    let bookPriceTax
    bookPriceTax = priceAfterDiscount() + amountOfTax()
    console.log("Price book after tax = "+bookPriceTax)
}

if (book.enable == true){
    console.log("The book is ready to Buy")
}
console.log (book.title+" Price = "+book.price)
priceAfterTax()