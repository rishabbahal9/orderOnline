//Importing 3rd party modules
const express=require("express")
//Importing self declared modules
const goodController=require("../controller/good")
const isAuth=require("../util/isAuth")

//Declaring variables
const router=express.Router()

//Test routes

//Original routes
router.get('/getGoods',isAuth,goodController.getGoods)

exports.routes=router