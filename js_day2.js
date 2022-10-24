//expressjs start here
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

//Make object
const book = {
    title : "Detective Conan The Scarlet Alibi",
    available : true,
    price : 100000,
    tax : 12,
    discount : 30,
}

//root page
app.get('/', authentication, (req, res)=>{
    res.send(book)
})

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
        res.send(titleMap.get(title));//get respon to Postman
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