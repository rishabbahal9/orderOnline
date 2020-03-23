//Importing 3rd party modules
const express=require("express")
//Importing self declared modules
const orderController=require("../controller/order")
const isAuth=require("../util/isAuth")

//Declaring variables
const router=express.Router()

//Test routes

//Original routes
router.post('/addOrder',isAuth,orderController.postAddOrder)

exports.routes=router