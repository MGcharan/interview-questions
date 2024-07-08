import mongoose,{mongo} from "mongoose";
import { ObjectId } from "bson";

const notesSchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true
        
    },
    role:{
        type:String,
        required:true,
    },
    package:{
        type:Number,
        required:true,
    },
    questions:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    user:{
        type:ObjectId,
        ref:"user",
    }
})

const notesModel=mongoose.model("notes",notesSchema)
export{notesModel}