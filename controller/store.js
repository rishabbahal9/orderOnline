const Store=require("../model/store")
const constants=require('../util/constants')

//Test methods

//Original methods
exports.getStoresDistance=(req,res,next)=>{
    var distance=req.params.distance
    res.status(200).json({dist: distance, msg: "store working fine"})
}

