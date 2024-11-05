import express from 'express';
import User from '../Models/user.js';
import {jwtAuthMiddleware,generateToken} from '../jwt.js';
const router = express.Router();

// router.get('/testing',async(req,res)=>{
//      res.status(200).json("successfully executed")
// })

const checkadmin=async(role)=>{
  const check=await User.findOne({role:role});
  return check;
}

router.post('/signup', async (req, res) => {
  try {

    const data = req.body;
    if(await checkadmin(data.role) && data.role==='admin'){
      return res.status(403).json({message:"duplicate admin"});
    }
    if(data.role=='admin'){
      const check=await User.findOne({role:data.role});
      if(check===true){
        return res.status(403).json({message:"duplicate admin"});
      }
    }
    const response =await User(data);  // Corrected
    
    const savedresponse = await response.save();
    console.log("data sent successfully");
    
    // If you want to generate a token and send it along with the response:
    const payload = { 
      id: savedresponse.id 
    };
    
    const token = generateToken(payload);
    console.log("token was ", token);
    res.status(200).json({ response: savedresponse, token: token });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
});

// login route

router.post('/login',async(req,res)=>{
  try {
    // extract adhaarno and password from req body
    // send adhaarno ,password by post method then it return token if all set
     const { adhaarno,password}=req.body;
     const user=await User.findOne({adhaarno: adhaarno});
     if(!user||!await user.comparePassword(password)){
         return res.status(401).json({error:"invalid username or password"})
     }

     // generate token
     const payload={
      id:user.id,
     }
     const token=generateToken(payload);

     // return token as response

     return res.status(200).json({token:token});

  } catch (error) {
    return res.status(500).send({message:"internal server error"});
  }
})
router.get('/profile',async(req,res)=>{
  try { 
    //  const userdata=req.user;
    //  const userId=userdata.id;

     const user=await User.find();
     res.status(200).send("working fine");
  } catch (error) {
    return res.status(500).send({message:"internal server error"});
  }
})



 
router.put('/profile/password', async (req, res) => {
  try {
    // Accessing the id from jwt token (as user)
    const userdata=req.user;
    const userId=userdata.id;
    const user = await User.findById(userId);
    const {currentPassword,newPassword}=req.body;

    if(!user||!await user.comparePassword(currentPassword)){
        return res.status(401).json({error:"invalid username or password"})
    }

     user.password=newPassword;
     await user.save();
    //  res.status(200).send(req.body);
   
    console.log("password updated");
     res.status(200).json({user});
  } 
  catch (error) {
    console.error("Error updating data", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const personid = req.params.id; 
    const response = await User.findById(personid);
    
    if (!response) {
      return res.status(404).json({ message: "Person not found" });
    }

    await response.deleteOne();
    
    console.log("Data deleted successfully");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting data", error); 
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;    