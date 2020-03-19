//Importing 3rd party modules
const express=require("express")
//Importing self declared modules
const userController=require("../controller/user")

//Declaring variables
const router=express.Router()

router.get('/',userController.getHome)
router.get('/test',userController.getTest)
router.post('/userSignUp',userController.postUserSignup)
router.post('/userLogin',userController.postUserLogin)

exports.routes=router
