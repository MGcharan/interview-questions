import mongoose from "mongoose"

export function databaseConnection(){
    const params={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
    try{
        mongoose.connect(process.env.DB_URL)
        console.log("MongoDb connected")

    }
    catch(err){
        console.log("MongoDB not connected",err)

    }
}