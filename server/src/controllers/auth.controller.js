import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";





// REGISTER

export const registerUser = async(req,res)=>{


try{


const {
firstName,
lastName,
username,
email,
password
}=req.body;



const existingUser =
await User.findOne({
email
});



if(existingUser){


return res.status(400).json({

success:false,

message:"User already exists"

});


}





const user =
await User.create({

firstName,

lastName,

username,

email,

password

});






const token =
jwt.sign(

{

id:user._id

},

process.env.JWT_SECRET,

{

expiresIn:"7d"

}

);





res.status(201).json({

success:true,

token,

user:{

id:user._id,

firstName:user.firstName,

lastName:user.lastName,

username:user.username,

email:user.email

}

});




}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


};










// LOGIN


export const loginUser = async(req,res)=>{


try{


const {

email,

password

}=req.body;



console.log("==============================");

console.log("LOGIN BODY:");

console.log(req.body);

console.log("==============================");





const user =
await User.findOne({

email

});





if(!user){


return res.status(401).json({

success:false,

message:"Invalid credentials"

});


}





console.log("USER FOUND:");

console.log(user);





const isMatch =
await bcrypt.compare(

password,

user.password

);





console.log(
"PASSWORD MATCH:",
isMatch
);





if(!isMatch){


return res.status(401).json({

success:false,

message:"Invalid credentials"

});


}





const token =
jwt.sign(

{

id:user._id

},

process.env.JWT_SECRET,

{

expiresIn:"7d"

}

);





res.json({

success:true,

token,

user:{

id:user._id,

firstName:user.firstName,

lastName:user.lastName,

username:user.username,

email:user.email,

role:user.role,

avatar:user.avatar

}

});





}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Login failed"

});


}


};









// GET CURRENT USER


export const getMe = async(req,res)=>{


try{


const user =
await User.findById(
req.user.id
)
.select("-password");




res.json({

success:true,

user

});



}catch(error){


res.status(500).json({

success:false,

message:"Unable to get user"

});


}


};