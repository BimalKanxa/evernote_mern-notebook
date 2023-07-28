import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context;
const [note, setNote] = useState({title: "", description: "", tags: "default"})

    const handleClick = (e) =>{
        e.preventDefault()
            addNote(note.title, note.description, note.tags);
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
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="tags" name="tags" onChange={onChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote