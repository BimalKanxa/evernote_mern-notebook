import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext)
    let navigate = useNavigate()
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){

            getNotes()
        }
        else{
                    navigate('/login')
        }
        //eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({id: "",etitle: "", edescription: "", etags: ""})

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags})
       
    }

    const handleClick = (e) =>{
        e.preventDefault()
        editNote(note.id, note.etitle, note.edescription, note.etags)
        refClose.current.click()
        props.showAlert("Updated Successfully", "success")
    }

    const onChange = (e) =>{
            setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}></AddNote>


            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display: "none"}}>
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-etitle" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="my-3 mb-3">
                                    <label htmlFor="etitle" className="form-label">title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                    <div id="emailHelp" className="form-text"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">description</label>
                                    <input type="text"value={note.edescription}  className="form-control" id="edescription" name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etags" className="form-label">tags</label>
                                    <input type="text"value={note.etags}  className="form-control" id="etags" name="etags" onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">

                <h2>Your Notes</h2>
                <div className="container mx-3 my-2">
                {notes.length === 0 && 'No notes to Display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                })}
            </div>

        </>
    )
}

export default Notes