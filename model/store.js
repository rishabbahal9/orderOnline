const mongoose=require("mongoose")
const Schema=mongoose.Schema

const storeSchema=new Schema(
    {
        name:{
            type: {fname: {type: String, required: true},fname: {type: String, required: true}},
            required: true
        },
        address:{
            type:{blockNumber: Number,street: String,city: String,province: String,pinCode: String},
            default: null
        },
        location:{
            type: Object,
            default: null
        },
        goodsAvailable:{
            type: [{quantity: {type: Number,required: true}, goodId: {type: Schema.Types.ObjectId,required: true}}]
        }
    }
)

module.exports=mongoose.model('Store',storeSchema)