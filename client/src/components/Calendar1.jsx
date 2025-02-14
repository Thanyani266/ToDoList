import axios from "axios"
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBListGroupItem, MDBTextArea, MDBTypography } from "mdb-react-ui-kit"
import { useContext, useEffect, useState } from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Calendar.css'
import { useNavigate, useOutletContext, useParams } from "react-router"
import Modal from "./Modal"
import ModalOne from "./ModalOne"
import { UserContext } from "../context/UserContext"
import Badge from "./Badge"

const Calendar1 = () => {
  const { isSidebarOpen } = useOutletContext();
  const user = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkedItems] = useState(() => {
    const saved = localStorage.getItem("checkedItems");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const convertTasksToDateObjects = tData => {
    const tasksData = tData.filter(task => task.username === user.username)
    return tasksData.map(task => ({
      ...task,
      date: new Date(task.date)
    }))
  }

  const getTasks = async () => {
    try {
      const response = await axios.get('https://to-do-list-mu-green.vercel.app/tasks');
      if (response.status === 200) {
        const convertedTasks = convertTasksToDateObjects(response.data);
        setTasks(convertedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {
    getTasks();
    
  });

  const [list, setList] = useState([]);

  useEffect(() => {
    getLists();
  }, [])

  const getLists = async () => {
    const response = await axios.get('https://to-do-list-mu-green.vercel.app/lists')
    if (response.status === 200) {
      setList(response.data)
    }
  }

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayTasks = tasks.filter(task => new Date(task.date).toDateString() === date.toDateString());
      return dayTasks.map(task => (
        <div key={task.id} className="highlighted-date bg-warning bg-opacity-25"></div>
      ));
    }
    return null;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const getTasksForSelectedDate = () => {
    if (!selectedDate) return [];
    const taskData = tasks.filter(task => {
      const taskDate = new Date(task.date);
      const today = new Date();

      taskDate.setHours(0,0,0,0);
      today.setHours(0,0,0,0);

      return taskDate >= today;
  });
    return taskData.filter(task => task.date.toDateString() === selectedDate.toDateString());
  };

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
        getSingleTask(id)
    }
  }, [id])

  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [showModalOne, setShowModalOne] = useState(false);
  const [task, setTask] = useState(null)

  const getSingleTask = async (id) => {
    try {
      const response = await axios.get(`https://to-do-list-mu-green.vercel.app/task/${id}`);
      if (response.status === 200) {
        setTask({...response.data[0]});
        setShowModalOne(true);
      }
    } catch (error) {
      console.error('Error fetching task', error);
    }
  };

  const handleCloseModalOne = () => {
    setShowModalOne(false);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const response = await axios.put(`https://to-do-list-mu-green.vercel.app/task/${taskId}`, updatedData);
      if (response.status === 200) {
        setTasks(tasks.map(task => (task.id === taskId ? response.data : task)));
        setTitle('');
        setDescription('');
        setCategory('');
        setDate('');
        setEditingTask(null);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      try {
        const response = await axios.delete(`https://to-do-list-mu-green.vercel.app/task/${id}`);
        if (response.status === 200) {
          getTasks();
        }
      } catch (error) {
        console.error('Error deleting task', error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskData = { title, description, category, date };
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      navigate(0)
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

  /*const renderTasks = () => {
    return tasks.map(task => (
      <li key={task.id}>{task.title} - {task.date}</li>
    ));
  };*/

  return (
    <MDBCol className={`${isSidebarOpen ? 'col-md-8' : 'col'}`}>
        <MDBContainer>
          <MDBTypography tag='div'>
            <h1>Task Calendar</h1>
            <Calendar tileContent={renderTileContent} onClickDay={handleDayClick} />
            {selectedDate && (
        <div className="task-list">
          <h2>Tasks for {selectedDate.toDateString()}</h2>
          <ul>
            {getTasksForSelectedDate().map(task => (
                <MDBListGroupItem key={task.id} className={`${checkedItems[task.id] ? 'd-none' : ''} d-flex justify-content-between align-items-start border border-2 rounded mt-2 p-3`}>
                  <div className='ms-2 me-auto'>
                    <div className='text-capitalize fw-bold'>
                    {task.title}</div><Badge>{task.category}</Badge>
                  </div>
                  <MDBBtn onClick={() => startEditing(task)} className="me-1 rounded-pill btn-outline-info"><MDBIcon fas icon='edit' size="lg" /></MDBBtn>
        <MDBBtn onClick={() => getSingleTask(task.id)} className="me-1 rounded-pill btn-outline-secondary"><MDBIcon fas icon="eye" size="lg" /></MDBBtn>
        <MDBBtn onClick={() => deleteTask(task.id)} className="me-1 rounded-pill btn-outline-danger">
          <MDBIcon fas icon='trash' size='lg'/>
        </MDBBtn>
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
            Update Task
          </MDBBtn>
        </form>
        </MDBContainer>
      </Modal>
          </ul>
        </div>
      )}
          </MDBTypography>
        </MDBContainer>
      </MDBCol>
  )
}

export default Calendar1
