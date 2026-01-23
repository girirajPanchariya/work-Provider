import { UserModel } from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { workModel } from "../Models/workModel.js";
import { validationResult } from "express-validator";
import { genretOtp, otpStore, sendOtp } from "../OthreFiles/Email.js";

export const RegisterUser = async (req, res) => {
  try {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {
      name,
      email,
      password,
      phoneNumber,
      loginType,
      address,
      otp

    } = req.body;

   if(!otp){
     if (!name || !email || !password || !loginType) {
      return res.status(400).json({ message: "All required fields are needed" });
    }

    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: `User already exists: ${user.name}` });
    }
    const genrettedOTP = genretOtp()

    otpStore.set(email,{
      otp:genrettedOTP,
      data:{name,password,loginType,address,phoneNumber},
     expire: Date.now() + 10 * 60 * 1000
    })
    await sendOtp (email,genrettedOTP)
    return res.status(200).json({
      message:'OTP sent to your email',success:true
    })
   }
   const store = otpStore.get(email)
   if(!store){
    return res.status(400).json({
      message:`Email not found or otp expired`,success:false
    })
  }
  if(Date.now()>store.expire){
      otpStore.delete(email)
      return res.status(400).json({message:`OTP expired`,success:false})    
  }
  if(store.otp !== otp){
    return res.status(400).json({
      message:"otp is not match"
    })
  }
  const {name:storeName, password:storepassword,loginType:storeloginType,phoneNumber:storephoneNumber,address:storeaddress}= store.data;

    const hashpassword = await bcrypt.hash(storepassword, 10);
    const user = new UserModel({
      name:storeName,
      email,
      password:hashpassword,
      phoneNumber:storephoneNumber,
      loginType:storeloginType,
      address:storeaddress,

    });

    await user.save();
      otpStore.delete(email)    
    
    return res.status(200).json({
      message: `User registered successfully: ${user.name}`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "User registration error", error: error.message });
  }
};


// ✅ Login User
export const Login = async (req, res) => {
  try {
    const { email, password, loginType } = req.body;

    let user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User is not registered",});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Email or password is incorrect" });

    if (loginType !== user.loginType)
      return res.status(400).json({ message: "Login type mismatch" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "2d" });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,        // change to true if using HTTPS
        sameSite: "lax"
      })
      .status(200)
      .json({
        message: `${user.name} logged in successfully`,
        user,
        token
      });

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Login error", error: error.message });
  }
};
// ✅ Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "Strict" });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Logout error", error: error.message });
  }
};

// ✅ Get All Workers
export const AllWorker = async (req, res) => {
  try {
    const workers = await UserModel.find({ loginType: "worker" }).populate("workId");

    if (!workers.length) return res.status(404).json({ message: "No workers found" });

    return res.status(200).json({ message: "Workers fetched successfully", workers });
  } catch (error) {
    console.error("Error fetching workers:", error);
    return res.status(500).json({ message: "Worker fetch error" });
  }
};

// ✅ Get All Work Providers
export const AllWorkerProvider = async (req, res) => {
  try {
    const workers = await UserModel.find({ loginType: "workProvider" });

    if (!workers.length) return res.status(404).json({ message: "No work providers found" });

    return res.status(200).json({ message: "Work providers fetched successfully", workers });
  } catch (error) {
    console.error("Error fetching work providers:", error);
    return res.status(500).json({ message: "Work provider fetch error" });
  }
};

export const currentUser = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const user = await UserModel.findById(userId).populate("workId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Sanitize user object (don't send hashed password)
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      message: "User details found",
      user: userObj,
    });
  } catch (error) {
    console.error("Error finding current user:", error);
    return res.status(500).json({
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};



export const updateUser = async (req, res) => {
  try {
   const userId = req.user.id;  // 🔑 Get ID from authenticated user context

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const { name, email, password, PhonNumber, loginType, address, workerType, profile } = req.body;

    const updateData = { name, email, PhonNumber, loginType, address, workerType, profile };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Update user error", error: error.message });
  }
};

// ✅ Find All Work Matching Logged-In User's WorkerType
export const findWorkByWorkTypes = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized: User ID missing" });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const work = await workModel.find({ workerType: user.workerType });

//  const similarWorks = await UserModel.find({ 
//       workerType: work.workerType,
//       _id: { $ne: userId } // Exclude the original work
//     });
    return res.status(200).json({ message: "All related work", work,user });
  } catch (error) {
    console.error("Error in findWorkByWorkType:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
