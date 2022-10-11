//object and property of book
const book = {
    title : "Detective Conan The Scarlet Alibi",
    available : true,
    price : 100000,
    tax : 12,
    discount : 30,
    stock : 3,
    purchased : 2
}

//Main
console.log (book.title+" Price = "+book.price)
console.log("Amount Of Discount = "+amountOfDiscount())
console.log("Price book after discount = "+priceAfterDiscount())
console.log("Amount of Tax = "+amountOfTax())
console.log("Price book after tax = "+priceAfterTax())
buyBook()

//Make the function count and statement
//Function count of discount price
function amountOfDiscount(){
    let discountPrice = book.price*(book.discount/100)
    return discountPrice
}

//Function count of tax price
function amountOfTax(){
    let taxPrice = book.price*(book.tax/100)
    return taxPrice
}

//Function count of the price after get the discount
function priceAfterDiscount(){
    let bookPriceDiscount
    bookPriceDiscount= book.price - amountOfDiscount()
    return bookPriceDiscount
}

//Function count of the price after get the discount and get tax price
function priceAfterTax(){
    let bookPriceTax
    bookPriceTax = priceAfterDiscount() + amountOfTax()
    return bookPriceTax
}

function buyBook(){
    let totalPay = 0;
    for(let i=1; i<=book.purchased; i++){
        if(book.available){
            totalPay +=priceAfterTax();
            // console.log("Total you must pay is "+totalPay)
            book.stock -=1
            if(book.stock<=0){
                book.available = false
            }
        } else{
            break;
        }
    }
    console.log("Total you must pay is "+totalPay)
    book.stock > 0 ? console.log("Amount of book after purchasing can be purchased again") : console.log("Amount of book after purchasing can't be purchased again")
    
}