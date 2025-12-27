import mongoose from "mongoose";

export const ConnectionDb = async()=>{
    try {
        
       await mongoose.connect(process.env.MONGO_URI)
        console.log(`the data base is conneted`);
        
    } catch (error) {   
            console.log(error);
            
    }
}