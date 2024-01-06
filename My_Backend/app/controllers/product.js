const express=require("express")
const router=express.Router()
const db = require("../../config/db")

router.post("/addProducts" , (req, res)=>{
    // console.log("hi");
    console.log(req.body)
    const {imagePath, productName, productId, productQty, productAmount, productHeading, productDescription,productCategory} = req.body
    const sql = `INSERT INTO products(productImagePath, productName, productId, productQty, productAmt, productHeading ,productDes,productCategory)
                VALUES('${imagePath}','${productName}','${productId}','${productQty}','${productAmount}', '${productHeading}','${productDescription}','${productCategory}')`
    db.query(sql,(err,result) => {
        if(err)return res.status(404).send(result)
        res.status(200).send(result)

    })
})

router.put("/updateProduct",(req, res)=>{
    const {imagePath, productName, productId, productQty, productAmount, productHeading, productDescription,productCategory,slno} = req.body
    console.log(req.body);
    const sql = `UPDATE products SET productImagePath='${imagePath}', productName='${productName}', productId='${productId}', 
                    productQty='${productQty}',productAmt='${productAmount}', productHeading='${productHeading}',
                    productDes='${productDescription}', productCategory='${productCategory}' WHERE slno='${slno}'` 
    db.query(sql,(err,result) => {
        if(err) throw err
        res.status(200).send(result)

    })
})

router.get("/getAllProducts", (req, res) => {
    const sql = "SELECT * FROM products"

    db.query(sql, (err, result) => {
        if(err) throw err

        res.status(200).send(result)
    })
})

router.get("/filterPrice/:price",(req,res)=> {
    console.log(`${req.params.price}`,"HI");
    const price = req.params.price
    const sql = `SELECT * FROM products WHERE productAmt <='${price}' and productAmt >= '${0}'`

    db.query(sql,(err,result) => {
        if(err)return res.status(404).send(result)
        res.status(200).send(result)

    })
})

router.get("/filterCategory/:cat",(req,res)=> {
    const sql = `SELECT * FROM products WHERE productCategory = '${req.params.cat}'`
    db.query(sql,(err,result) => {
        if(err)return res.status(404).send(result)
        res.status(200).send(result)

    })
})

router.delete("/deleteUser/:slno",(req,res) => {
    const sql = `DELETE FROM products WHERE slno = '${req.params.slno}'`
    db.query(sql,(err,result) => {
        if(err)return res.status(404).send(result)
        res.status(200).send(result)

})
})

router.get("/getSelectedProduct/:slno",(req,res) => {
    const sql = `SELECT * FROM products WHERE slno = '${req.params.slno}'`
    db.query(sql,(err,result) => {
        if(err) throw err
        res.status(200).send(result)
})
})
router.get("/viewProduct/:slno",(req,res) => {
    const sql = `SELECT * FROM products WHERE slno = '${req.params.slno}'`
    db.query(sql,(err,result) => {
        if(err) throw err
        res.status(200).send(result)
})
})

module.exports=router