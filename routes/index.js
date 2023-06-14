const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;//TODO

const removeExtension = (fileName) => {
    //TODO tracks.js => [tracks,js]
    return fileName.split('.').shift()
}
//const a = fs.readdirSync(PATH_ROUTES)
fs.readdirSync(PATH_ROUTES).filter((file) =>{
    const name = removeExtension(file)//TODO index,tracks
    if (name !== 'index'){
        //console.log(`cagando ruta ${name}`)
        router.use(`/${name}`,require(`./${file}`)) //TODO http://localhost:3000/api/tracks
    }
})
//console.log({a})

module.exports = router