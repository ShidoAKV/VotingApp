import express from 'express';
import User from '../Models/user.js';
import {jwtAuthMiddleware,generateToken} from '../jwt.js';
const router = express.Router();
import { upload } from '../Middleware/multer.js';
import { v2 as cloudinary } from 'cloudinary';

// router.get('/testing',async(req,res)=>{
//     return res.status(200).send("successfully executed")
// })

const checkadmin=async(role)=>{
  const check=await User.findOne({role:role});
  return check;
}

router.post('/signup', async (req, res) => {
  try {
    const data = req.body;

    // Check if an admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (await adminExists && data.role ==='admin') {
       console.log('duplicate admin');
       
      return res.status(400).send("Admin already exist" );
    }
   
    const user=await User.findOne({adhaarno:data.adhaarno});
    if(user){
      return res.status(400).send("User already exist" );
    }

    // Create a new user
    const response = new User(data);  
    const savedresponse = await response.save();
    console.log("Data saved successfully");

    // Generate a token and send it along with the response
    const payload = { id: savedresponse.id };
    const token = generateToken(payload);
    console.log("Token:", token);

    res.status(200).json({ response: savedresponse, token: token });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "internal server error" });
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
    return res.status(500).send({message:" Incorrect Credential"});
  }
})

router.post('/adminlogin',async(req,res)=>{
  try {
    // extract adhaarno and password from req body
    // send adhaarno ,password by post method then it return token if all set
     const { adhaarno,password}=req.body;
     const user=await User.findOne({adhaarno: adhaarno});
     if(!user||!await user.comparePassword(password)){
         return res.status(401).json({error:"invalid username or password"})
     }

      if(user.role!=='admin'){
        return res.status(400).send('user not admin');
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

router.get('/admincheck', async (req, res) => {
  try {
      const response = await User.findOne({ role: 'admin' });

      if (!response) {
          return res.status(200).send('Admin not present');
      }
      return res.status(200).json(response);
  } catch (error) {
      console.error("Error checking admin presence:", error);
      return res.status(500).send('Internal server error');
  }
});


router.get('/profile',async(req,res)=>{
  try { 
     const {adhaarNo,password}=req.query;
      // console.log({adhaarNo,password});
      if(!adhaarNo||!password){
        return res.status(401).send('Enter credentials ')
      }
      
    const userdata=await User.findOne({adhaarno:adhaarNo});
    if(!userdata){
      return res.status(401).send('Incorrect Adhaar No')
     }
    const user_password_check=await userdata.comparePassword(password);
     if(!user_password_check){
      return res.status(401).send('Incorrect password')
     }
    //  console.log(userdata.adhaarno);
     
    //  if(userdata.adhaarno!==adhaarNo){
    //   return res.status(401).send('Incorrect Adhaar No')
    //  }

      //  console.log(userdata);
 
     return res.status(200).send({success:true,userdata});
  } catch (error) {
    return res.status(500).send({message:"internal server error"});
  }
}) 

router.post('/upload',upload.single('image'),async(req,res)=>{
  try { 
    const image=req.file;
    const {id}=req.body;
   
    console.log(id);
    
    if(!image){
      return res.status(400).json('Please Upload image');
    }
    
    const imageUpload = await cloudinary.uploader.upload(image.path, {
      resource_type: 'image',
    });
  
    const imageURL = imageUpload.secure_url;
    
    if(!imageURL){
      return res.status(400).json('Image not uploaded');
    }
    //  console.log(imageURL);
    
      
 
    const response=await User.findByIdAndUpdate(id,{image:imageURL});
    
    if(!response){
      return  res.status(400).json({success:false,message:'Database error'});
    }
    
    return res.status(200).json({success:true,imageurl:imageURL});
    
  } catch (error) {
    return res.status(401).json('internal server error');
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