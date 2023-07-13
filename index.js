const connecttomongo=require("./db")
const express=require("express")
const cors=require("cors")
connecttomongo();
const app=express()
const port=3000; 
app.use(express.json());
app.use(cors());

//endpoints

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))




app.listen(port,()=>{
    console.log("connected succesfully at port "+ port)
})