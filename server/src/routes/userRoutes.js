import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();




// UPDATE PROFILE

router.put(
"/profile",
authMiddleware,
async(req,res)=>{


try{


const {
firstName,
lastName,
email,
image
}=req.body;



const user =
await User.findById(
req.user.id
);



user.firstName = firstName;

user.lastName = lastName;

user.email = email;



if(image){

user.avatar = image;

}



await user.save();



res.json({

success:true,

user:{

id:user._id,

firstName:user.firstName,

lastName:user.lastName,

username:user.username,

email:user.email,

avatar:user.avatar,

role:user.role

}

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Profile update failed"

});


}


});









// CHANGE PASSWORD


router.put(

"/password",

authMiddleware,

async(req,res)=>{


try{


const {

oldPassword,

newPassword

}=req.body;




const user =
await User.findById(
req.user.id
);





if(!user){


return res.status(404).json({

success:false,

message:"User not found"

});


}





const match =
await bcrypt.compare(

oldPassword,

user.password

);





if(!match){


return res.status(400).json({

success:false,

message:"Current password incorrect"

});


}





// IMPORTANT
// direct assign + save triggers bcrypt middleware

user.password = newPassword;



await user.save();





res.json({

success:true,

message:"Password changed successfully"

});





}catch(error){


console.log(error);



res.status(500).json({

success:false,

message:"Password change failed"

});


}



}



);





export default router;