const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
require('dotenv').config()
const users=require('./routes/api/users')
const articles=require('./routes/api/articles')
const {checkToken} =require('./middleware/auth')

const mongoUri=mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log('connected'));

app.use(bodyParser.json())
app.use(checkToken)
app.use("/api/users",users)
app.use("/api/articles",articles)

const port=process.env.PORT||8000

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})