const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userSchema=new Schema(
    {
        name:{
            type: {fname: {type: String, required: true},fname: {type: String, required: true}},
            required: true
        },
        email:{
            type: String, 
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
        dp:{
            type:String,
            default: null
        },
        pwd: {
            type: String,
            required: true
        },
        orders: {
            type: [{type: Schema.Types.ObjectId}]
        },
        dateCreated: {
            type: Date, 
            default: Date.now
        }
    }
)

module.exports=mongoose.model('User',userSchema)