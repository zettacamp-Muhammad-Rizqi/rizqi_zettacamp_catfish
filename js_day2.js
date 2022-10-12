// Test include the object and declare the property
const book = {
    title : "Detective Conan The Scarlet Alibi",
    available : true,
    price : 100000,
    tax : 12,
    discount : 30,
    stock : 3,
    purchased : 2
}

buyBook(book)

function buyBook(book){
    let discountPrice = book.price*(book.discount/100)
    let taxPrice = book.price*(book.tax/100)
    let bookPriceDiscount= book.price - discountPrice
    let bookPriceTax = bookPriceDiscount + taxPrice
    
    let totalPay = 0;
    for(let i=1; i<=book.purchased; i++){
        if(book.available){
            totalPay +=bookPriceTax;
            book.stock -=1
            if(book.stock<=0){
                book.available = false
                break;
            }
        } 
        // else{
        //     break;
        // }
    }

    console.log("Amount of Discount = "+discountPrice)
    console.log("Price after Discount = "+bookPriceDiscount)
    console.log("Amount of Tax = "+taxPrice)
    console.log("Price after tax = "+bookPriceTax)
    console.log("Total you must pay is "+totalPay)
    book.stock > 0 ? console.log("Amount of book after purchasing can be purchased again") : console.log("Amount of book after purchasing can't be purchased again")
}