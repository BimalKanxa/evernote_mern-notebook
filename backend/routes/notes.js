const express = require("express")
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


// Route 1 : fetching notes using : GET "api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {  


        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
        // res.json([])
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// Route 2 : add notes login required : POST "api/notes/fetchallnotes"




router.post('/addnote', fetchuser, [
    body('title', 'please enter a valid title').isLength({ min: 3 }),
    body('desciption', 'Description should be atleast 5 characters'),
], async (req, res) => {

    try {
        const { title, description, tags } = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tags, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {  //if some internal error has occured
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
 
})
 
// Route 3 : update existing note  : PUT "api/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) =>{
    const {title, description, tags} = req.body;
    //create a newNote object

    try {

    const newNote = {};
     if(title){newNote.title = title};
     if(description){newNote.description = description};
     if(tags){newNote.tags = tags};

     //find the notes to be updated and update it
     let note = await Note.findById(req.params.id);
     if(!note){ return res.status(404).send("Not found")}

     if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
     }
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new : true})
        res.json({note}) 

    }catch (error) {  //if some internal error has occured
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

        // Route 4 : delete existing note  : DELETE "api/notes/deletenote"
        
router.delete('/deletenote/:id', fetchuser, async (req, res) =>{

    try {
         //find the notes to be deleted and deletee it

     let note = await Note.findById(req.params.id);
     if(!note){ return res.status(404).send("Not found")}

     //allowed deletion if user owns this note
     if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
     }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Note has been deleted", note : note}) 

    } catch (error) {  //if some internal error has occured
        console.error(error.message)
        res.status(500).send("Internal server error")
        
    }
})


module.exports = router