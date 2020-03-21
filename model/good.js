const mongoose=require("mongoose")
const Schema=mongoose.Schema

const goodSchema=new Schema(
    {
        name: {type: String,required:true},
        description: {type: String,required:true},
        category: {type: String, required: true},
        pictures: {type: Array},
        price: {type: Number, required: true}
    }
)

module.exports=mongoose.model('Good',goodSchema)

