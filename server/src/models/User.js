import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(

  {

    firstName: {

      type: String,

      required: true,

      trim: true,

    },


    lastName: {

      type: String,

      required: true,

      trim: true,

    },


    username: {

      type: String,

      required: true,

      unique: true,

      trim: true,

    },


    email: {

      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true,

    },


    password: {

      type: String,

      required: true,

      minlength: 6,

    },


    avatar: {

      type: String,

      default: "",

    },


    bio: {

      type: String,

      default: "",

    },


    role: {

      type: String,

      default: "member",

    },


    isVerified: {

      type: Boolean,

      default: false,

    },


  },

  {

    timestamps:true,

  }

);




// HASH PASSWORD BEFORE SAVE

userSchema.pre(
  "save",
  async function(next){

    // only hash when password changed

    if(!this.isModified("password")){

      return next();

    }


    const salt =
    await bcrypt.genSalt(10);


    this.password =
    await bcrypt.hash(
      this.password,
      salt
    );


    next();


  }
);




// PASSWORD COMPARE FUNCTION

userSchema.methods.comparePassword =
async function(password){


  return await bcrypt.compare(

    password,

    this.password

  );


};



const User =
mongoose.model(
  "User",
  userSchema
);


export default User;