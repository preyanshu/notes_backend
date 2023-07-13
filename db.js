const mongoose=require("mongoose");
const mongoURI="mongodb+srv://mishrapreyanshu:3yIeCPr3g4oJVcyF@cluster0.yzhtsom.mongodb.net/?retryWrites=true&w=majority"
const connecttomongo=async()=> {
    await mongoose.connect(mongoURI)
    console.log("connected successfully")
}

module.exports=connecttomongo; 