import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { databaseConnection } from "./database.js"
import { userRouter } from "./routes/user.js";
import { isAuthorized } from "./middleware/auth.js";
import { noteRouter } from "./routes/notesRoute.js";



const app=express();
// config env
dotenv.config();
const PORT=process.env.PORT;

// middleware
app.use(express.json())
app.use(cors())




 
// DB connection
databaseConnection();
// router connect

app.use("/api/user/",userRouter);
app.use("/api/notes",isAuthorized,noteRouter)





// server listenning
app.listen(PORT,()=>{
    console.log(`server is running successfully :${PORT}`)
})