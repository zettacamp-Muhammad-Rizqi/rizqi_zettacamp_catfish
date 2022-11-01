//Require
const {app, port} = require('./express')
const mongoose = require('mongoose')



//Mongose Connections
async function connected(){
    await mongoose.connect('mongodb://localhost:27017/zettacamp_batch3');
}
connected()

//Array Object for list song
const songs = [
    {
        no : 1,
        title : "The Color Violet",
        artist : "Tory Lanez",
        duration : 4,
        genre : "pop",
    },
    {
        no : 2,
        title : "You Belong With Me",
        artist : "Taylor Swift",
        duration : 3,
        genre : "pop",
    },
    {
        no : 3,
        title : "The Shadow",
        artist : "Blues Cousins",
        duration : 10,
        genre : "jazz",
    },
    {
        no : 4,
        title : "Begadang",
        artist : "Rhoma Irama",
        duration : 3,
        genre : "dangdut",
    },
    {
        no : 5,
        title : "Faded",
        artist : "Alan Walker",
        duration : 3,
        genre : "edm",
    },
    {
        no : 6,
        title : "FadedSing Me to Sleep",
        artist : "Alan Walker",
        duration : 3,
        genre : "edm",
    },
    {
        no : 7,
        title : "Judi",
        artist : "Rhoma Irama",
        duration : 5,
        genre : "dangdut",
    },
    {
        no : 8,
        title : "Tak Pernah Ternilai",
        artist : "Last Child",
        duration : 5,
        genre : "pop",
    },
    {
        no : 9,
        title : "Rider",
        artist : "Saykoji",
        duration : 3,
        genre : "rap",
    },
    {
        no : 10,
        title : "Not Afraid",
        artist : "Eminem",
        duration : 4,
        genre : "rap",
    },
    {
        no : 11,
        title : "Venom",
        artist : "Eminem",
        duration : 5,
        genre : "rap",
    },
    {
        no : 12,
        title : "What a wonderful World",
        artist : "Louis Armstrong",
        duration : 2,
        genre : "jazz",
    },
    {
        no : 13,
        title : "Craving You",
        artist : "Thomas Rhett",
        duration : 5,
        genre : "country",
    },
    {
        no : 14,
        title : "Wagon Wheel",
        artist : "Darius Rucker",
        duration : 5,
        genre : "country",
    },
    {
        no : 15,
        title : "Yours If You Want It",
        artist : "Rascal Flatts",
        duration : 5,
        genre : "country",
    },
]

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
 })