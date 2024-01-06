const express=require ("express")
const router = express.Router()
const userController = require("../app/controllers/usermodule")
const productController =require("../app/controllers/product")
const orderController = require("../app/controllers/orders")

router.use("/user",userController)
router.use("/product",productController)
router.use("/orders",orderController)

module.exports=router