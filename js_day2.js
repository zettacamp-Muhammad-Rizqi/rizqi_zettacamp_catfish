//Make object
const book = {
    title : "Detective Conan The Scarlet Alibi",
    available : true,
    price : 100000,
    tax : 12,
    discount : 30,
    stock : 3,
    purchased : 2,
    isCredit : false,
    creditMonth : 6,
    credit : [],
}

buyBook(book) //Call the function

function buyBook(buku){
    let {creditMonth} = book //Destructuring object to make creditMonth from the book too make local variabel
    let discountPrice = book.price*(book.discount/100) //count the discount price
    let taxPrice = book.price*(book.tax/100) // count the tax price
    let bookPriceDiscount= book.price - discountPrice //count the book after get discount
    let bookPriceTax = bookPriceDiscount + taxPrice // count the book after get discount and get tax

    if(book.isCredit==true){
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

        console.log("Amount of Discount = "+discountPrice)
        console.log("Price after Discount = "+bookPriceDiscount)
        console.log("Amount of Tax = "+taxPrice)
        console.log("Price after tax = "+bookPriceTax)
        console.log("Total you must pay is "+totalPay)
        book.stock > 0 ? console.log("Amount of book after purchasing can be purchased again") : console.log("Amount of book after purchasing can't be purchased again")
    }
    
}