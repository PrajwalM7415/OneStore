const express=require("express")
const router=express.Router()
const db = require("../../config/db")

router.post("/order" , (req, res)=>{
    console.log("hi");
    const {ProductId, Mode, TotalAmount,userId} = req.body
    console.log(req.body);

    const sql = `INSERT INTO orders(productId, mode, totalAmount, userId)
                VALUES('${ProductId}','${Mode}','${TotalAmount}','${userId}')`
    db.query(sql,(err,result) => {
        if(err)return res.status(404).send(result)
        res.status(200).send(result)

    })
})

router.put("/updateStatus/:status/:orderId",(req,res) => {
    const sql = `UPDATE orders SET status = '${req.params.status}' where orderId = '${req.params.orderId}'`
    db.query(sql,(err,result) => {
        if(err)return res.status(404).send(result)
        res.status(200).send(result)

    })
})

router.get("/order/:userId", (req, res) => {
    const sql = `SELECT * FROM orders where userId='${req.params.userId}'`

    db.query(sql, (err, result) => {
        if(err) throw err

        res.status(200).send(result)
    })
})
router.get("/orderList", (req, res) => {
    const sql = "SELECT * FROM orders"

    db.query(sql, (err, result) => {
        if(err) throw err

        res.status(200).send(result)
    })
})

module.exports=router