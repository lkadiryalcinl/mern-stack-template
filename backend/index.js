require("dotenv").config()
const express=require('express')
const cors=require('cors')
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/Auth")
const userRoutes=require("./routes/User")
const { connectToDB } = require("./database/db")


// server init
const server=express()

// database connection
connectToDB()


// middlewares
server.use(cors({origin:process.env.ORIGIN,credentials:true,exposedHeaders:['X-Total-Count'],methods:['GET','POST','PATCH','DELETE']}))
server.use(express.json())
server.use(cookieParser())
server.use(morgan("tiny"))

server.options('*', cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }));

// routeMiddleware
server.use("/auth",authRoutes)
server.use("/users",userRoutes)

server.get("/",(req,res)=>{
    res.status(200).json({message:'running'})
})

server.listen(7000,()=>{
    console.log('server [STARTED] ~ http://localhost:7000');
})
