const titleOfBook= "Detective Conan The Scralet Alibi"
let enable = true
let price = 100000
let tax = 12
let discount = 30


function amountOfDiscount(){
    let discountPrice = price*(discount/100)
    console.log("Amount Of Discount = "+discountPrice)
    return discountPrice
}

function amountOfTax(){
    let taxPrice = price*(tax/100)
    console.log("Amount of Tax = "+taxPrice)
    return taxPrice
}

function priceAfterDiscount(){
    let bookPriceDiscount
    bookPriceDiscount= price - amountOfDiscount()
    console.log("Price book after discount = "+bookPriceDiscount)
    return bookPriceDiscount
}
function priceAfterTax(){
    let bookPriceTax
    bookPriceTax = priceAfterDiscount() + amountOfTax()
    console.log("Price book after tax = "+bookPriceTax)
}

if (enable == true){
    console.log("The book is ready to Buy")
}
console.log (titleOfBook+" Price = "+price)
priceAfterTax()