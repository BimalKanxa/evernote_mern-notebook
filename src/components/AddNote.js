import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context;
const [note, setNote] = useState({title: "", description: "", tags: ""})

    const handleClick = (e) =>{
        e.preventDefault()
            addNote(note.title, note.description, note.tags);
            props.showAlert("Note added Successfully", "success")
            setNote({title: "", description: "", tags: ""})
    }

    const onChange = (e) =>{
            setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>

                <form>
                    <div className="my-3 mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"value={note.title} onChange={onChange}  minLength={5} required/>
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description"value={note.description} onChange={onChange}  minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="tags" name="tags"value={note.tags} onChange={onChange} minLength={3} required/>
                    </div>

                    <button disabled={note.title.length<5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote