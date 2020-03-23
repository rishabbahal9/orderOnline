const Store=require("../model/store")
const constants=require('../util/constants')

//Test methods

//Original methods
exports.getStores=(req,res,next)=>{
    Store.aggregate([
        {$unwind: "$goodsAvailable"},
        {$lookup:{from: "goods", localField: "goodsAvailable.goodId", foreignField: "_id", as: "goodsAvailableC"}},
        {$project: {_id:1,name:1,address:1,location:1, goodsAvailable: {quantity: "$goodsAvailable.quantity",good: { $arrayElemAt: [ "$goodsAvailableC", 0 ] }}}},
        {$group: {_id: {id:"$_id",name:"$name",address:"$address",location:"$location"},goodsAvailable: {$push: "$goodsAvailable"}}},
        {$project:{ _id:"$_id.id",name: "$_id.name", address: "$_id.address", location: "$_id.location", goodsAvailable: "$goodsAvailable"}},
        {$limit: 5}
    ])
    .then(storeArray=>{
        console.log(storeArray)
        res.status(200).json({storeArray: storeArray})
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({status: constants.status2, response: constants.string6})
    })
}

exports.getStoresDistance=(req,res,next)=>{
    var distance=req.params.distance
    var longitude=req.query.longitude
    var latitude=req.query.latitude
    res.status(200).json({dist: distance, msg: "store working fine", long: longitude, lat: latitude})
}