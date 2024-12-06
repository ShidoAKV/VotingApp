import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router1 from './Routes/user.routes.js';
import router2 from './Routes/candidates.routes.js';
import db from './MongoDB/index.js';
import cors from 'cors'
dotenv.config();

const PORT=(process.env.PORT||7000);
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/About',async(req,res)=>{ 
   try {
    res.send({message:"data sended successfully on port 7000"});
   } catch (error) {
     console.log(error);
     
   }
}) 

 app.use('/user',router1);
 app.use('/candidate',router2);

app.listen(PORT,()=>{
    console.log('app running on port 7000');
})