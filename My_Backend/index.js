const express = require('express')
const app = express()   //app is an object and express() is an constructor
const cors =require("cors")
const router = require("./config/routes")
const db = require("./config/db")
var bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
app.use(express.json())
app.use("/",router)


// app.get("/test", (req, res) => {
//     res.status(200).send("Hi")
// })
app.listen(3001, () =>
{
    console.log("App is listening on port 3001")
    
})