const mongoose=require("mongoose")
const Schema=mongoose.Schema

const orderSchema=new Schema(
    {
        userId: {type: Schema.Types.ObjectId,required:true},
        dateOrdered: {type: Date, default: Date.now,required: true},
        completed: {type: Boolean, default: false, required: true},
        totalPrice: {type: Number, required: true},
        goodsOrdered: {type: [
            {
                quantity: {type: Number, default: 1, required: true},
                good: {type: Schema.Types.ObjectId, required: true},
                store: {type: Schema.Types.ObjectId, required: true}
            }
        ],required:true}
    }
)

module.exports=mongoose.model('Order',orderSchema)

