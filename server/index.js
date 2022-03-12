const express=require('express')
const cors=require('cors')
require('dotenv').config()
const mongoose=require('mongoose')
const app=express()
app.use(express.json())
const path=require('path')
app.use(cors())
const authRoutes=require('./routes/auth')

mongoose.connect(process.env.DATABASE,{
  useNewUrlParser:true,
 
  useUnifiedTopology:true,

}).then(()=>console.log("Successfully connected to mongoDB"))
.catch(err=>console.log(err))

app.use('/auth',authRoutes)

const PORT=process.env.PORT||7000
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))