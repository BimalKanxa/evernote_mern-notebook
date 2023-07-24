const express = require("express")
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


// Route 1 : fetching notes using : GET "api/auth/fetchallnotes"
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

// Route 1 : add notes login required : POST "api/auth/fetchallnotes"




router.post('/addnote', fetchuser, [
    body('title', 'please enter a valid title').isLength({ min: 3 }),
    body('desciption', 'Description should be atleast 5 characters'),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {  //if some internal error has occured
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

})


module.exports = router