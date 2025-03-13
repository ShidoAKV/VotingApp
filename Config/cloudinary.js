import {v2 as cloudinary} from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();
const connectCloudinary= ()=>{
  try {
     cloudinary.config({ 
      cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
      api_key:process.env.CLOUDINARY_API_KEY , 
      api_secret:process.env.CLOUDINARY_API_SECRET 
   });
  
  } catch (error) {
    console.error("Failed to configure Cloudinary:", error.message);
  }


}


export default connectCloudinary;


 