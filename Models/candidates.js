import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  party:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  votes:[
    {  
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        votedAt:{
           type:Date,
           default:Date.now()
        }
    }
  ],
  votecount:{
    type:Number,
    default:0
  }

}
,{timestamps:true}
);



const  Candidates=mongoose.model('Candidates',candidateSchema);

export default Candidates;

