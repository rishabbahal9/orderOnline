//Importing core modules
const http=require('http')

//Importing 3rd party modules
const express=require('express')
const bodyParser=require('body-parser')
const dotenv=require("dotenv")
dotenv.config()
const mongoose=require("mongoose")

//Declaring variables
const app=express()
const PORT=process.env.PORT
const userRoutes=require("./routes/user")

//Creating middlewares
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH')
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Authorization,Accept')
    next()
})


app.use((req,res,next)=>{
    console.log("Request: "+req.url+"\tMethod: "+req.method)
    next()
})
app.use(userRoutes.routes)

app.use((req,res,next)=>{
    res.status(404).json({error: "Page not found!"})
})
//Creating server
const server=http.createServer(app)

//Listening to port
mongoose.connect(process.env.MONGO_CLIENT,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{
    app.listen(PORT,(err)=>{
        if(err)
            console.log("Something went wrong!")
        else
            console.log("Listening to port "+PORT)
    })
})
.catch(err=>{
    console.log(err)
})
