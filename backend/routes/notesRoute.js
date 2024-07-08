import express from 'express'
import { deletedNotes, getAllNotes, getUserNotes, postNewNotes, updateNotes } from '../controller/notescontrol.js'

const router=express.Router()

// get all notes
router.get("/all",async(req,res)=>{
    try{

        const notes=await getAllNotes();
        if(!notes || notes.lenght<0){
            return res.status(404).json(
                {error:"No content available"}
            ) }
        res.status(200).json({
            data:notes,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Internal server"})

    }

})

// get all user notes
router.get("/user/all",async(req,res)=>{

    try{
        const notes=await getUserNotes(req)
        if(!notes || notes.length<0){
            return res.status(404).json({
                error:"No content available"
            })
        }
        res.status(200).json({
            data:notes
        })

    }catch(err){
        console.log(err)
        res.status(500).json({err:"Internal server"})

    }
})

// add new user notes
router.post("/user/add",async(req,res)=>{
    try{
        const newPost= await postNewNotes(req)
        if(!newPost){
            return res.status(400).json({
                error:"Error occured uploading"
            })
        }
        res.status(201).json({
            message:"successfully uploding",
            data:newPost
        })

    }catch(err){
        console.log(err)
        res.status(500).json({err:"Internal server"})

    }
})

// edit the usernotes
router.put("/user/edit/:id",async(req,res)=>{
    try{
        const editNotes=await updateNotes(req)
        if(!updateNotes){
            return res.status(400).json({
                error:"Error occured updating"
            })
        }
        res.status(200).json({
            message:"successfully updating",
            data:editNotes
        })
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Internal server"})

    }

})

// delete the user notes
router.delete("/user/delete/:id",async(req,res)=>{
    try{
        const deleteNotes=await deletedNotes(req);
        if(!deletedNotes){
            return res.status(400).json({
                error:"error occured while deleting"
            });
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"internal server"
        })
        
    }

})
export const noteRouter=router