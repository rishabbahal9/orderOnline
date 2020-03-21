//Importing 3rd party modules
const express=require("express")
//Importing self declared modules
const storeController=require("../controller/store")
const isAuth=require("../util/isAuth")

//Declaring variables
const router=express.Router()

//Test routes

//Original routes
router.get('/getStores/:distance',isAuth,storeController.getStoresDistance)

exports.routes=router