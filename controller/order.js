const Order=require("../model/order")
const User=require("../model/user")
const constants=require("../util/constants")
const mongoose=require("mongoose")

exports.postAddOrder=(req,res,next)=>{
    const userId=mongoose.Types.ObjectId(req.body.userId)
    const totalPrice=req.body.totalPrice
    const goodsOrdered=req.body.goodsOrdered

    var orderObject=new Order({
        userId: userId,
        totalPrice: totalPrice,
        goodsOrdered: {
            quantity: goodsOrdered.quantity,
            good: mongoose.Types.ObjectId(goodsOrdered.good),
            store: mongoose.Types.ObjectId(goodsOrdered.store)
        }
    })

    orderObject.save()
    .then(result=>{
        console.log(constants.string8)
        User.updateOne({_id: userId},{$push:{orders: mongoose.Types.ObjectId(result._id)}})
        .then(result2=>{
            console.log("Order also added to User")
            res.status(201).json({response: constants.string8, status: constants.status1})
        })
        .catch(error2=>{
            console.log(error)
            res.status(500).json({response: constants.string6, status: constants.status2})
        })
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({response: constants.string6, status: constants.status2})
    })
}