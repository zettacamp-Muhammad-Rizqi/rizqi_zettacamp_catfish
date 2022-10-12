// Test include the object and declare the property
const book = {
    title : "Detective Conan The Scarlet Alibi",
    enable : true,
    price : 100000,
    tax : 12,
    discount : 30,
}

totalPay(book)

function totalPay(book){
    let discountPrice = book.price*(book.discount/100)
    let taxPrice = book.price*(book.tax/100)
    let bookPriceDiscount= book.price - discountPrice
    let bookPriceTax = bookPriceDiscount + taxPrice
    
    if(book.enable==true){
        console.log("The book is ready to buy")
    } else{
        console.log("The book is not ready to buy")
    }
    console.log("Amount of Discount = "+discountPrice)
    console.log("Price after Discount = "+bookPriceDiscount)
    console.log("Amount of Tax = "+taxPrice)
    console.log("Price after tax = "+bookPriceTax)
}