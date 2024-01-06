const express = require("express")
const router = express.Router()
const db = require("../../config/db")



router.get("/", (req,res)=>{
    console.log("i am user")
    res.status(200).send("Prajwal")
})




router.post("/login",(req,res) => {
    console.log(req.body)
    const {name, password} = req.body
    const sql = `select * from user_page where USER_EMAIL = '${name}' and USER_PASSWORD = '${password}'`
    db.query(sql,(err,result ) =>{
        if(err) throw err
        
        if(result.length > 0){
            res.status(200).send(result)

        }else{
            res.status(404).send("NO USER FOUND")
        }

    })

    

})
router.post("/adminLogin",(req,res) => {
    console.log(req.body)
    const {name, password} = req.body
    const sql = `select * from admin where username = '${name}' and password = '${password}'`
    db.query(sql,(err,result ) =>{
        if(err) throw err
        if(result.length > 0){
            res.status(200).send(result)

        }else{
            res.status(404).send("NO USER FOUND")
        }
        
    })

    

})

router.post("/signup",(req,res) => {
    console.log(req.body)
    const { FirstName, LastName, Address , Email, PhoneNumber, Password} = req.body

    const sql = `INSERT INTO user_page(USER_FIRSTNAME,USER_LASTNAME,USER_ADDRESS,USER_EMAIL,USER_PHNO,USER_PASSWORD) 
                VALUES('${FirstName}','${LastName}','${Address}','${Email}','${PhoneNumber}','${Password}')`
    db.query(sql,(err,result ) =>{
        
        if(err)return res.status(404).send(result)
        // if(result.length > 0){
        res.status(200).send(result)
        
    })
})

router.put("/Reset",(req,res) =>{
    console.log(req.body)
    const sql = "UPDATE user_page  SET* FROM user_page"

    db.query(sql, (err, result) => {
        if(err) throw err

        res.status(200).send(result)
    })
} )



router.get("/userdetails", (req, res) => {
    const sql = "SELECT * FROM user_page"

    db.query(sql, (err, result) => {
        if(err) throw err

        res.status(200).send(result)
    })
})

module.exports=router