import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// const MONGOURL="mongodb://localhost:27017/VotingApp"
// const MONGOURL="mongodb+srv://abhi3vish:abhi123@cluster0.bn1tr.mongodb.net/"
mongoose.connect(process.env.MONGOURL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
// db object
const db=mongoose.connection;

db.on('connected',()=>{ 
  console.log("MongoDb connected successfully !!");
  
})
db.on('error',(err)=>{
  console.log("MongoDb connected error !!",err);
})
db.on('disconnected',()=>{
  console.log("MongoDb disconnected successfully !!");
})

export default db;