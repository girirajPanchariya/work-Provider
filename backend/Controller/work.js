import mongoose from "mongoose";
import { UserModel } from "../Models/UserModel.js";
import { workModel } from "../Models/workModel.js"

export const PostWork = async (req, res) => {
  try {
    const userId = req.user.id;  // fix here
 
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }

    const { workerType, address, PyMeant, workDescription, workPostData } = req.body;

    if (!workerType || !address || !PyMeant) {
      return res.status(400).json({ message: "All required fields are mandatory" });
    }

    const work = new workModel({
      workerType,
      address,
      PyMeant,
      workDescription,
      workPostData,
      userId:userId,
    });

    await work.save();


    return res.status(200).json({ message: "Work posted successfully", work });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllwork = async (req, res) => {
  try {
    const works = await workModel.find({}).populate({
        path:'userId',
        model:'UserModel'
    }); // ✅ await added

    if (!works || works.length === 0) {
      return res.status(400).json({
        message: "No work found",
      });
    }

    return res.status(200).json({
      message: "All work fetched successfully",
      works,
    });
  } catch (error) {
    console.log("Error in getllwork:", error);
    return res.status(500).json({
      message: "Server error while fetching work",
    });
  }
};

export const workTypeTofineworker = async (req, res) => {
  try {
   const  {id}  = req.params;
console.log("Received work ID:", id);

    const worke = await workModel.findById(id);

    if (!worke) {
      return res.status(400).json({
        message: 'No such work found with this ID',
      });
    }

    // Find all workers that match the workerType of the found work
    const workers = await UserModel.find({ workerType: worke.workerType });

    // Also find all other works with the same workerType
    const similarWorks = await workModel.find({ 
      workerType: worke.workerType,
      _id: { $ne: id } // Exclude the original work
    });

    return res.status(200).json({
      message: "Workers and works related to this work type",
      workType: worke.workerType,
      workers,
      similarWorks
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const workByid = async(req,res)=>{
    try {
        const {id} = req.params;

        const work = await workModel.findById(id).populate('userId')

        return res.status(200).json(
          work
        )
    } catch (error) {
      console.log(error);
      
    }
}
export const MyWorks= async(req,res)=>{
      try {
        const userId = req.user.id

          const works = await workModel.find({userId}).populate('userId')
          if(!works){
              return res.status(400).json({
                message:'the user is not login'
              })
          }
          return res.status(200).json(
            works
          )
      } catch (error) {
        console.log(error);
        
      }
}
export const deletingwork  = async(req,res)=>{
    try {
        const workId = req.params.id;

        const deletingworks = await workModel.findByIdAndDelete(workId)

        if(!deletingwork){
          return res.status(400).json({message:"the work is already deleted"})
        }

        return res.status(200).json({message:"the work is deleted",deletingworks})

    } catch (error) {
      console.log(error);
      
      return res.status(500).json({error:error})
    }
}