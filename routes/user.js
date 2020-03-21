//Importing 3rd party modules
const express=require("express")
//Importing self declared modules
const userController=require("../controller/user")
const isAuth=require("../util/isAuth")

//Declaring variables
const router=express.Router()

//Test routes
router.get('/',userController.getHome)
router.get('/test',userController.getTest)
router.get('/userAuthenticatedTest',isAuth,userController.getUserAuthenticatedTest)
//Orignal routes
router.post('/userSignUp',userController.postUserSignup)
router.post('/userLogin',userController.postUserLogin)

exports.routes=router
