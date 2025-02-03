import axios from "axios";
import { MDBBtn, MDBCheckbox, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBTextArea, MDBTypography } from "mdb-react-ui-kit"
import { useContext, useEffect, useState } from "react";
import Modal from './Modal';
import '../App.css'
import { useNavigate, useParams } from "react-router";
import ModalOne from "./ModalOne";
import { UserContext } from "../context/UserContext";
import Badge from "./Badge";


const Today = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const user = useContext(UserContext)
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem("checkedItems");
    return saved ? JSON.parse(saved) : {};
  });

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const addTask = async (dat) => {
    try {
      const taskData = {
        ...dat,
        username: user ? user.username : null // Add username to task object
      };
      const response = await axios.post('http://localhost:5000/task', taskData);
      if (response.status === 200) {
        console.log('Task added successfully:', response.data);
        // Optionally reset form fields here
        setTitle('');
        setDescription('');
        setCategory('');
        setDate('');
        user.username;
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  const updateTask = async (taskId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/task/${taskId}`, updatedData);
      if (response.status === 200) {
        console.log('Task updated successfully:', response.data);
        // Update the tasks list
        setTasks(tasks.map(task => (task.id === taskId ? response.data : task)));
        // Optionally reset form fields here
        setTitle('');
        setDescription('');
        setCategory('');
        setDate('');
        setEditingTask(null);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  
  useEffect(() => {
    getTasks();
  }, [])

  useEffect(() => {
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const getTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks')
    if (response.status === 200) {
      setData(response.data)
    }
  }

  const [list, setList] = useState([]);

  useEffect(() => {
    getLists();
  }, [])

  const getLists = async () => {
    const response = await axios.get('http://localhost:5000/lists')
    if (response.status === 200) {
      setList(response.data)
    }
  }

  const deleteTask = async (id) => {
    if(window.confirm("Are you sure you want to delete the task?")){
      const response = await axios.delete(`http://localhost:5000/task/${id}`)
      if (response.status === 200) {
        getTasks();
      }
    }
  }
  
  const [task, setTask] = useState(null)
 
  const {id} = useParams()
  useEffect(() => {
    if(id) {
        getSingleTask(id)
    }
  }, [id])

  const [showModal, setShowModal] = useState(false);
  const [showModalOne, setShowModalOne] = useState(false);

  const getSingleTask = async (id) => {
    const response = await axios.get(`http://localhost:5000/task/${id}`)
    if (response.status === 200) {
        setTask({...response.data[0]});
        setShowModalOne(true);
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
      setEditingTask(null);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const taskData = { title, description, category, date };
      if (editingTask) {
        updateTask(editingTask.id, taskData);
        navigate('/tasks')
      } else {
        addTask(taskData);
        navigate('/tasks')
      }
    };
    
    const startEditing = (task) => {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setDate(task.date);
      setEditingTask(task);
      setShowModal(true);
    };
    
    const isToday = (someDate) => {
      const today = new Date();
      const dateToCompare = new Date(someDate);
      return dateToCompare.getDate() === today.getDate() &&
             dateToCompare.getMonth() === today.getMonth() &&
             dateToCompare.getFullYear() === today.getFullYear();
    };
  
    const todyTasks = data.filter(task => isToday(task.date));
    const todayTasks = todyTasks.filter(task => task.username === user.username);

  console.log('data => ', data);
  console.log(todayTasks);
  
  return (
    <MDBCol md='8'>
    <MDBTypography tag='span' className="fw-bold display-6 py-5">
            Today <MDBTypography tag='span' className="float-end ms-auto border bg-secondary px-2 text-light rounded">{todayTasks.length}</MDBTypography>
        </MDBTypography>
    <MDBBtn className="w-100 text-start mt-5 bg-transparent border text-success" onClick={handleOpenModal}><MDBIcon fas icon="plus" className="me-2" />new task </MDBBtn>
    <MDBListGroup light style={{ minWidth: '22rem' }}>
      {todayTasks && todayTasks.map(item => (
      <MDBListGroupItem className={`d-flex justify-content-between align-items-start rounded border border-2 mt-2 ${checkedItems[item.id] ? 'text-light bg-secondary bg-opacity-25' : ''}`} key={item.id}>
        {(user.username === item.username) ? 
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
        <MDBBtn onClick={() => startEditing(item)} className="me-1 rounded-pill btn-outline-info"><MDBIcon fas icon='edit' size="lg" /></MDBBtn>
        <MDBBtn onClick={() => getSingleTask(item.id)} className="me-1 rounded-pill btn-outline-secondary"><MDBIcon fas icon="eye" size="lg" /></MDBBtn>
        <MDBBtn onClick={() => deleteTask(item.id)} className="me-1 rounded-pill btn-outline-danger">
          <MDBIcon fas icon='trash' size='lg'/>
        </MDBBtn></> : null}
      </MDBListGroupItem>
      ))}
      <ModalOne show={showModalOne} onClose={handleCloseModalOne}>
        <MDBContainer style={{textAlign: 'start'}}>
        <h5 className="fw-bold text-center">Task: </h5>
        <div className="fs4 border p-2 rounded mb-2"><span className="fw-bold text-muted">Title: </span>{task && task.title}</div>
        <div className="fs4 border p-2 rounded mb-2"><span className="fw-bold text-muted">Description: </span>{task && task.description}</div>
        <div className="fs4 border p-2 rounded mb-2"><span className="fw-bold text-muted">List: </span>{task && task.category}</div>
        <div className="fs4 border p-2 rounded mb-2"><span className="fw-bold text-muted">Due date: </span>{task && task.date}</div>
        <MDBBtn className="me-1" onClick={() => startEditing(task)}>edit</MDBBtn>
        <MDBBtn onClick={() => deleteTask(task.id)}>delete</MDBBtn>
        </MDBContainer>
      </ModalOne>
      <Modal show={showModal} onClose={handleCloseModal}>
        <MDBContainer>
        <h5 className="fw-bold">{editingTask ? 'Update Task' : 'Add New Task'}</h5>
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
            {editingTask ? 'Update Task' : 'Add Task'}
          </MDBBtn>
        </form>
        </MDBContainer>
      </Modal>
    </MDBListGroup> 
    </MDBCol>
  )
}

export default Today
