import { notesModel } from "../models/notes.js";


// query for all Notes
export function getAllNotes(){
    return notesModel.find().populate("user","username");

}

// query for user Notes
 export function getUserNotes(req){
    return notesModel.find({user:req.user._id}).populate("user","username email")
 }
//  query to post new notes

export function postNewNotes(req) {
    const updatedDate = new Date().toJSON().slice(0, 10);
    return new notesModel({
      ...req.body,
      date: updatedDate,
      user: req.user._id,
    }).save();
  }

//  query for edit Notes
export function updateNotes(req){
    return notesModel.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
} ;

// query for delete Notes
export function deletedNotes(req){
    return notesModel.findByIdAndDelete({_id:req.params.id,});
}
