const Good=require("../model/good")
const constants=require("../util/constants")

exports.getGoods=(req,res,next)=>{
    Good.find().limit(5)
    .then(goodsArray=>{
        res.status(200).json({goodsArray: goodsArray})
    })
    .catch(error=>{
        res.status(500).json({status: constants.status2, response: constants.string6})
    })
}