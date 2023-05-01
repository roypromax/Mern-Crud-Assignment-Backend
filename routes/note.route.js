const express = require("express");

const noteRoute = express.Router();

const {NoteModel} = require("../models/notes.model")

noteRoute.get("/",async(req,res)=>{
    try {
        const notes = await NoteModel.find({authorID:req.body.authorID});
        res.status(200).send(notes).json();
    } catch (error) {
        res.status(400).send({err:error}).json();
    }
})

noteRoute.post("/add",async(req,res)=>{
    try {
        const newNote = new NoteModel(req.body);
        await newNote.save();
        res.status(200).send({msg:"New note has been added"}).json();
    } catch (error) {
        res.status(400).send({err:error}).json();
    }
})

noteRoute.patch("/update/:noteID",async(req,res)=>{
    const {noteID} = req.params;
    try {
        const note = await NoteModel.findById({_id:noteID});
        if(note.authorID!==req.body.authorID){
            res.status(400).send({msg:"You are not the author"}).json();
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body);
            res.status(200).send({msg:`Note with id:${noteID} has been updated`})
        }
    } catch (error) {
        res.status(400).send({err:error}).json();
    }
})

noteRoute.delete("/delete/:noteID",async(req,res)=>{
    const {noteID} = req.params;
    try {
        const note = await NoteModel.findById({_id:noteID});
        if(note.authorID!==req.body.authorID){
            res.status(400).send({msg:"You are not the author"}).json();
        }else{
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({msg:`Note with id:${noteID} has been deleted`})
        }
    } catch (error) {
        res.status(400).send({err:error}).json();
    }
})

module.exports = {noteRoute};