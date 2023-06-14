require("dotenv").config()
const express = require("express")
const cors = require ("cors")
const dbConnectNoSql = require('./config/mongo')
const {dbConnectMySql} = require('./config/mysql')
const app = express()
const ENGINE_DB = process.env.ENGINE_DB; 

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))

const port = process.env.PORT || 3001

/**
 * Aqui invocamos a las rutas 
 */
//TODO http://localhost/api/*************** */
app.use("/api",require("./routes"))

app.listen(port, () =>{
    console.log(`el servidor esta corriendo en http://localhost:${port}`);
});

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql();