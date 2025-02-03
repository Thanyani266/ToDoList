import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTextArea, MDBTypography } from "mdb-react-ui-kit"
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import ModalOne from "./ModalOne";
import Modal from "./Modal";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import { TrimTitle } from "./TrimTitle";
import { TrimDesc } from "./TrimDesc";


const StickyNotes = () => {
    const [data, setData] = useState([]);
    const user = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = async () => {
      const response = await axios.get('http://localhost:5000/notes')
      if (response.status === 200) {
        setData(response.data)
      }
    }

  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [background, setBackground] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [showModalOne, setShowModalOne] = useState(false);
  const [note, setNote] = useState(null)

  const deleteNote = async (id) => {
    if(window.confirm("Are you sure you want to delete the note?")){
      const response = await axios.delete(`http://localhost:5000/note/${id}`)
      if (response.status === 200) {
        getNotes();
        navigate(0);
      }
    }
  }
 
  const {id} = useParams()
  useEffect(() => {
    if(id) {
        getSingleNote(id)
    }
  }, [id])

  const getSingleNote = async (id) => {
    const response = await axios.get(`http://localhost:5000/note/${id}`)
    if (response.status === 200) {
        setNote({...response.data[0]});
        setShowModalOne(true);
      }
  }

    const addNote = async (dat) => {
        try {
          const noteData = {
            ...dat,
            username: user ? user.username : null // Add username to task object
          };
          const response = await axios.post('http://localhost:5000/note', noteData);
          if (response.status === 200) {
            console.log('Note added successfully:', response.data);
            // Optionally reset form fields here
            setTitle('');
            setDescription('');
            setBackground('');
            setShowModal(false);
          }
        } catch (error) {
          console.error('Error adding note:', error);
        }
    }

    const updateNote = async (noteId, updatedData) => {
        try {
          const response = await axios.put(`http://localhost:5000/note/${noteId}`, updatedData);
          if (response.status === 200) {
            console.log('Note updated successfully:', response.data);
            // Update the tasks list
            setNotes(notes.map(note => (note.id === noteId ? response.data : note)));
            // Optionally reset form fields here
            setTitle('');
            setDescription('');
            setBackground('');
            setEditingNote(null);
            setShowModal(false);
          }
        } catch (error) {
          console.error('Error updating note:', error);
        }
      };

      const handleCloseModalOne = () => {
        setShowModalOne(false);
      }

      const handleOpenModal = () => {
        setTitle('');
        setDescription('');
        setBackground('');
        setEditingNote(null);
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
  
      const handleSubmit = (event) => {
        event.preventDefault();
        const noteData = { title, description, background };
        if (editingNote) {
          updateNote(editingNote.id, noteData);
          setShowModal(false)
          setShowModalOne(false)
          navigate(0)
        } else {
          addNote(noteData);
          setShowModal(false)
          setShowModalOne(false)
          navigate(0)
        }
      };

      
      const startEditing = (note) => {
        setTitle(note.title);
        setDescription(note.description);
        setBackground(note.background);
        setEditingNote(note);
        setShowModal(true);
      };

      const notesData = data.filter(task => task.username === user.username);
    
  return (
    <MDBCol md='8'>
        <MDBTypography tag='span' className="fw-bold display-6">
            Sticky Wall
        </MDBTypography>
        <MDBContainer className="mt-4 border rounded p-5">
            <MDBRow>
            {notesData && notesData.map((item) => {
                return (
            <MDBCol lg='4' md='6' className="mb-3" key={item.id}>
            <MDBCard style={{height: '300px'}} className={`${item.background} bg-opacity-25 pe-auto`}>
                <MDBCardBody className="d-flex flex-column">
                    <MDBCardTitle>{TrimTitle(item.title)}</MDBCardTitle>
                    <MDBCardText>
                        {TrimDesc(item.description)}
                    </MDBCardText>
                    <div className="mt-auto">
                    <MDBBtn className="btn-outline-dark p-0 fs-4 px-1"><MDBIcon fas icon="eye" onClick={() => getSingleNote(item.id)} /></MDBBtn>
                    </div>       
                </MDBCardBody>
            </MDBCard>
            </MDBCol> )
            })}
            <ModalOne show={showModalOne} onClose={handleCloseModalOne}>
               <MDBContainer style={{textAlign: 'start'}}>
               <h5 className="fw-bold text-center">Note: </h5>
               <div className="fs4 border p-2 rounded mb-2"><span className="fw-bold text-muted">Title: </span>{note && note.title}</div>
               <div className="fs4 border p-2 rounded mb-2"><span className="fw-bold text-muted">Description: </span>{note && note.description}</div>
               <MDBBtn className="me-1" onClick={() => startEditing(note)}>edit</MDBBtn>
               <MDBBtn onClick={() => deleteNote(note.id)}>delete</MDBBtn>
                    
               </MDBContainer>
                  </ModalOne>
            <Modal show={showModal} onClose={handleCloseModal}>
        <MDBContainer>
        <h5 className="fw-bold">{editingNote ? 'Update Note' : 'Add New Note'}</h5>
        <form onSubmit={handleSubmit}>
          <MDBInput required className='mb-4' type='text' id='form1Example14' label='Title' name='title' value={title} onChange={(event) => setTitle(event.target.value)} />
          <MDBTextArea className='mb-4' label="Description" id="textAreauExample" rows="{6}" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
          <select className='form-select mb-4' value={background} onChange={(event) => setBackground(event.target.value)}>
            <option value="">Select Background</option>
            <option value="bg-warning">Yellow</option>
            <option value="bg-success">Green</option>
            <option value="bg-info">Blue</option>
            <option value="bg-danger">Red</option>
          </select>
          <MDBBtn type='submit' block className='bg-secondary'>
            {editingNote ? 'Update Note' : 'Add Note'}
          </MDBBtn>
        </form>
        </MDBContainer>
      </Modal>
            <MDBCol lg='4' md='6' className="mb-3 my-auto">
            <MDBCard className="bg-secondary text-center text-light p-5" onClick={handleOpenModal} style={{cursor: 'pointer'}}>
            <MDBIcon fas icon="plus" className="display-5"/>
            </MDBCard>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
    </MDBCol>
  )
}

export default StickyNotes
