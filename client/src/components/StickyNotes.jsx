import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTextArea, MDBTypography } from "mdb-react-ui-kit"
import { useEffect, useState } from "react";
import ModalOne from "./ModalOne";
import PropTypes from 'prop-types';
import { createNote, deleteNote, getSingleNote, updateNote } from '../redux/notesSlice';
import Modal from "./Modal";
import { fetchNotes } from '../redux/notesSlice';
import {useParams} from 'react-router-dom'
import { TrimTitle } from "./TrimTitle";
import { TrimDesc } from "./TrimDesc";
import { useDispatch, useSelector } from "react-redux";


const StickyNotes = ({isSidebarOpen, onEditNote, currentNote, setCurrentNode, showModal, setShowModal}) => { 
  const [showModalOne, setShowModalOne] = useState(false);

  const { noteId } = useParams();  // Get taskId from URL params

    const dispatch = useDispatch();
      const notes = useSelector((state) => state.notes.items);
      const selectedNote = useSelector((state) => state.notes.selectedNote);
      const status = useSelector((state) => state.notes.status);
    
      useEffect(() => {
        if (noteId) {
          dispatch(getSingleNote(noteId));  // Fetch the single task
        }
      }, [noteId, dispatch]);
    
      useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchNotes()); // Trigger if status is 'idle'
        }
      }, [status, dispatch]);
    
      const handleGetSingleNote = (noteId) => {
        dispatch(getSingleNote(noteId));
        setShowModalOne(true);
      };
      
      console.log(currentNote);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [background, setBackground] = useState('')
  
    useEffect(() => {
      if (currentNote) {
        setTitle(currentNote.title);
        setDescription(currentNote.description);
        setBackground(currentNote.background);
      } else {
        setTitle('');
        setDescription('');
        setBackground('');
      }
    }, [currentNote]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const note = { title, description, background };
      if (currentNote) {
        dispatch(updateNote({ ...currentNote, ...note })).then(() => {
          dispatch(getSingleNote(currentNote.id));
          setShowModalOne(false);
          dispatch(fetchNotes());
        });
        setCurrentNode(null); // Reset current note after updating
      } else {
        dispatch(createNote(note));
      }
      setTitle('');
      setDescription('');
      setBackground('');
      setShowModal(false);
    };

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
    setShowModalOne(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

    const handleCloseModalOne = () => {
      setShowModalOne(false);
    }

    const handleOpenModal = () => {
      setTitle('');
      setDescription('');
      setBackground('');
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    
  return (
    <MDBCol className={`${isSidebarOpen ? 'content-shifted': 'content'}`}>
        <MDBTypography tag='span' className="fw-bold display-6">
            Sticky Wall
        </MDBTypography>
        <MDBContainer className="mt-4 border rounded p-5">
            <MDBRow>
            {notes.length >= 1 ? notes.map((item) => {
                return (
            <MDBCol lg='4' md='6' className="mb-3" key={item.id}>
            <MDBCard style={{height: '300px'}} className={`${item.background} bg-opacity-25 pe-auto`}>
                <MDBCardBody className="d-flex flex-column">
                    <MDBCardTitle>{TrimTitle(item.title)}</MDBCardTitle>
                    <MDBCardText>
                        {TrimDesc(item.description)}
                    </MDBCardText>
                    <div className="mt-auto">
                    <MDBBtn className="btn-outline-dark p-0 fs-4 px-1"><MDBIcon fas icon="eye" onClick={() => handleGetSingleNote(item.id)} /></MDBBtn>
                    </div>       
                </MDBCardBody>
            </MDBCard>
            </MDBCol> )
            }) : 
            <>
            <MDBTypography tag='div' className="text-center fw-bold text-warning bg-secondary bg-opacity-25 mt-5">There are no note(s)</MDBTypography>
            <MDBBtn className="w-100 text-start mt-5 bg-transparent border text-success" onClick={handleOpenModal}><MDBIcon fas icon="plus" className="me-2" /> new note</MDBBtn>
            </>}
            
            <ModalOne show={showModalOne} onClose={handleCloseModalOne}>
               {selectedNote ? (
                <MDBContainer style={{textAlign: 'start'}} key={selectedNote.id}>
               <h5 className="fw-bold text-center">Note: </h5>
               <div className="fs4 border p-2 rounded mb-2"><span className="fw-bold text-muted">Title: </span>{selectedNote.title}</div>
               <div className="fs4 border p-2 rounded mb-2"><span className="fw-bold text-muted">Description: </span>{selectedNote.description}</div>
               <MDBBtn className="me-1" onClick={() => onEditNote(selectedNote)}>edit</MDBBtn>
               <MDBBtn onClick={() => handleDelete(selectedNote.id)}>delete</MDBBtn>
                    
               </MDBContainer>) : (<div>No note found</div>)}
                  </ModalOne>
            <Modal show={showModal} onClose={handleCloseModal}>
        <MDBContainer>
        <h5 className="fw-bold">{currentNote ? 'Update Note' : 'Add New Note'}</h5>
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
            {currentNote ? 'Update Note' : 'Add Note'}
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

StickyNotes.propTypes = {
  isSidebarOpen: PropTypes.bool,
  onEditNote: PropTypes.any,
  currentNote: PropTypes.any,
  setCurrentNode: PropTypes.any,
  showModal: PropTypes.any,
  setShowModal: PropTypes.any
};

export default StickyNotes
