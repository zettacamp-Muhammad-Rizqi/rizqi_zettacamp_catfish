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
        duration : 7,
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

// groupByArtist(songs, "Alan Walker")
// groupByGenre(songs, "rap")
groupByDuration(songs, 60)

function groupByArtist(songs, name){
    let artistName = songs.filter(artistName=>artistName.artist===name)
    console.log(...artistName)
}

function groupByGenre(songs, nameGenre){
    let genreName = songs.filter(genreName=>genreName.genre===nameGenre)
    // console.log(...genreName)
}

function groupByDuration(songs, minute){
    console.log("grupbyDuration")
    //this function for group songs less one hour
    
    let addition = 0
    for(let i=0; i<songs.length; i++){
        addition +=songs[i].duration
        if(addition<minute){
            console.log(songs[i].duration)
        }
    }
}