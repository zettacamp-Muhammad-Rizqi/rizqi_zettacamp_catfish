const songs = [
    {
        title : "The Color Violet",
        artist : "Tory Lanez",
        duration : 4,
        genre : "pop",
    },
    {
        title : "You Belong With Me",
        artist : "Taylor Swift",
        duration : 3,
        genre : "pop",
    },
    {
        title : "The Shadow",
        artist : "Blues Cousins",
        duration : 7,
        genre : "jazz",
    },
    {
        title : "Begadang",
        artist : "Rhoma Irama",
        duration : 3,
        genre : "dangdut",
    },
    {
        title : "Faded",
        artist : "Alan Walker",
        duration : 3,
        genre : "edm",
    },
    {
        title : "FadedSing Me to Sleep",
        artist : "Alan Walker",
        duration : 3,
        genre : "edm",
    },
    {
        title : "Judi",
        artist : "Rhoma Irama",
        duration : 5,
        genre : "dangdut",
    },
]

groupByArtist(songs)
groupByGenre(songs)

function groupByArtist(songs){
    let artistName = songs.filter(artistName=>artistName.artist==="Alan Walker")
    console.log(...artistName)
}

function groupByGenre(songs){
    let genreName = songs.filter(genreName=>genreName.genre==="dangdut")
    console.log(...genreName)
}

function groupByDuration(){
    //this function for group songs less one hour

    //durationTotal = (this optional if you can make it)
}