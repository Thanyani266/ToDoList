import axios from "axios";
import { MDBBtn, MDBCheckbox, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBTextArea, MDBTypography } from "mdb-react-ui-kit"
import { useEffect, useState } from "react";
import Modal from './Modal';
import PropTypes from 'prop-types';
import { createTask, deleteTask, getSingleTask, updateTask } from '../redux/dataSlice';
import '../App.css'
import { fetchData } from '../redux/dataSlice';
import {useParams} from 'react-router-dom'
import ModalOne from "./ModalOne";
import Badge from "./Badge";
import { useDispatch, useSelector } from "react-redux";


const Today = ({isSidebarOpen, onEditTask, currentTask, setCurrentTask, showModal, setShowModal}) => {
  const [showModalOne, setShowModalOne] = useState(false);

  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem("checkedItems");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const { taskId } = useParams();  // Get taskId from URL params

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.data.items);
  const selectedTask = useSelector((state) => state.data.selectedTask);
  const status = useSelector((state) => state.data.status);

  useEffect(() => {
    if (taskId) {
      dispatch(getSingleTask(taskId));  // Fetch the single task
    }
  }, [taskId, dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData()); // Trigger if status is 'idle'
    }
  }, [status, dispatch]);

  const handleGetSingleTask = (taskId) => {
    dispatch(getSingleTask(taskId));
    setShowModalOne(true);
  };
  
  console.log(currentTask);
  

  const [list, setList] = useState([]);

  useEffect(() => {
    getLists();
  }, [])

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
  
    useEffect(() => {
      if (currentTask) {
        setTitle(currentTask.title);
        setDescription(currentTask.description);
        setCategory(currentTask.category);
        setDate(currentTask.date);
      } else {
        setTitle('');
        setDescription('');
        setCategory('');
        setDate('');
      }
    }, [currentTask]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const task = { title, description, category, date };
      if (currentTask) {
        dispatch(updateTask({ ...currentTask, ...task })).then(() => {
          dispatch(getSingleTask(currentTask.id));
          setShowModalOne(false);
          dispatch(fetchData());
        });
        setCurrentTask(null); // Reset current task after updating
      } else {
        dispatch(createTask(task));
      }
      setTitle('');
      setDescription('');
      setCategory('');
      setDate('');
      setShowModal(false);
    };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    setShowModalOne(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

  const getLists = async () => {
    const response = await axios.get('https://to-do-list-mu-green.vercel.app/lists')
    if (response.status === 200) {
      setList(response.data)
    }
  }

    const handleCheckboxChange = (id) => {
      setCheckedItems((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };

    const handleCloseModalOne = () => {
      setShowModalOne(false);
    }

    const handleOpenModal = () => {
      setTitle('');
      setDescription('');
      setCategory('');
      setDate('');
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
    
    const isToday = (someDate) => {
      const today = new Date();
      const dateToCompare = new Date(someDate);
      return dateToCompare.getDate() === today.getDate() &&
             dateToCompare.getMonth() === today.getMonth() &&
             dateToCompare.getFullYear() === today.getFullYear();
    };
  
    const todayTasks = tasks.filter(task => isToday(task.date));

  console.log(todayTasks);
  
  return (
    <MDBCol className={`${isSidebarOpen ? 'content-shifted': 'content'}`}>
    <MDBTypography tag='span' className="fw-bold display-6 py-5">
            Today <MDBTypography tag='span' className="float-end ms-auto border bg-secondary bg-opacity-25 px-2 text-warning rounded">{todayTasks.length}</MDBTypography>
        </MDBTypography>
    <MDBBtn className="w-100 text-start mt-5 bg-transparent border text-success" onClick={handleOpenModal}><MDBIcon fas icon="plus" className="me-2" />new task </MDBBtn>
    <MDBListGroup light style={{ minWidth: '22rem' }}>
      {todayTasks.length >= 1 ? todayTasks.map(item => (
      <MDBListGroupItem className={`d-flex justify-content-between align-items-start rounded border border-2 mt-2 ${checkedItems[item.id] ? 'text-light bg-secondary bg-opacity-25' : ''}`} key={item.id}>
        <>
        <div className='ms-2 me-auto'>
          <div className='text-capitalize fw-bold'>
          <MDBCheckbox
                id='controlledCheckbox'
                label={item.title}
                checked={!!checkedItems[item.id]}
                onChange={() => handleCheckboxChange(item.id)}
            /></div><Badge>{item.category}</Badge>
        </div>
        <MDBBtn onClick={() => onEditTask(item)} className={`${checkedItems[item.id] ? 'd-none' : ''} me-1 rounded-pill btn-outline-info`}><MDBIcon fas icon='edit' size="lg" /></MDBBtn>
        <MDBBtn onClick={() => handleGetSingleTask(item.id)} className={`${checkedItems[item.id] ? 'd-none' : ''} me-1 rounded-pill btn-outline-secondary`}><MDBIcon fas icon="eye" size="lg" /></MDBBtn>
        <MDBBtn onClick={() => handleDelete(item.id)} className="me-1 rounded-pill btn-outline-danger">
          <MDBIcon fas icon='trash' size='lg'/>
        </MDBBtn></>
      </MDBListGroupItem>
      )) : <MDBListGroupItem className="text-center fw-bold text-warning bg-secondary bg-opacity-25 mt-5">No task(s) for today</MDBListGroupItem>}
      <ModalOne show={showModalOne} onClose={handleCloseModalOne}>
      { selectedTask ? (
        <MDBContainer className="border p-3 rounded bg-light" key={selectedTask.id} style={{ textAlign: 'start' }}>
      <h5 className="fw-bold text-center">Task Details:</h5>
      <div className="fs-4 border bg-warning bg-opacity-25 p-2 rounded mb-2">
        <span className="fw-bold text-muted">Title: </span>{selectedTask.title}
      </div>
      <div className="fs-4 border bg-warning bg-opacity-25 p-2 rounded mb-2">
        <span className="fw-bold text-muted">Description: </span>{selectedTask.description}
      </div>
      <div className="fs-4 border bg-warning bg-opacity-25 p-2 rounded mb-2">
        <span className="fw-bold text-muted">Category: </span>{selectedTask.category}
      </div>
      <div className="fs-4 border bg-warning bg-opacity-25 p-2 rounded mb-2">
        <span className="fw-bold text-muted">Due date: </span>{selectedTask.date}
      </div>
      <MDBBtn className="me-1" color="info" onClick={() => onEditTask(selectedTask)}>
      <MDBIcon fas icon='edit' size="lg" />
      </MDBBtn>
      <MDBBtn color="danger" onClick={() => handleDelete(selectedTask.id)}>
      <MDBIcon fas icon='trash' size='lg'/>
      </MDBBtn>
    </MDBContainer>) : (<div>No task found</div>)}
      </ModalOne>
      <Modal show={showModal} onClose={handleCloseModal}>
        <MDBContainer>
        <h5 className="fw-bold">{currentTask ? 'Update Task' : 'Add New Task'}</h5>
        <form onSubmit={handleSubmit}>
          <MDBInput required className='mb-4' type='text' id='form1Example4' label='Title' name='title' value={title} onChange={(event) => setTitle(event.target.value)} />
          <MDBTextArea className='mb-4' label="Description" id="textAreaExample" rows="{6}" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
          <select className='form-select mb-4' value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>Select Category</option>
          {list && list.map(item => (
            <option value={item.option} key={item.id}>
              {item.option}
            </option>
          ))}
        </select>
        <MDBInput required className='mb-4' type='date' id='form1Example8' label='date' name='date' value={date} onChange={(event) => setDate(event.target.value)} />
          <MDBBtn type='submit' block className='bg-secondary'>
            {currentTask ? 'Save Changes' : 'Add Task'}
          </MDBBtn>
        </form>
        </MDBContainer>
      </Modal>
    </MDBListGroup> 
    </MDBCol>
  )
}

Today.propTypes = {
  isSidebarOpen: PropTypes.bool,
  onEditTask: PropTypes.any,
  currentTask: PropTypes.any,
  setCurrentTask: PropTypes.any,
  showModal: PropTypes.any,
  setShowModal: PropTypes.any
};

export default Today
