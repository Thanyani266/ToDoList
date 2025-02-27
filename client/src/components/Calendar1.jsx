import axios from 'axios';
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroupItem,
  MDBTextArea,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import PropTypes from 'prop-types';
import {
  createTask,
  deleteTask,
  getSingleTask,
  updateTask,
} from '../redux/dataSlice';
import { fetchData } from '../redux/dataSlice';
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import ModalOne from './ModalOne';
import Badge from './Badge';
import { useDispatch, useSelector } from 'react-redux';

const Calendar1 = ({
  isSidebarOpen,
  onEditTask,
  currentTask,
  setCurrentTask,
  showModal,
  setShowModal,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModalOne, setShowModalOne] = useState(false);

  const [checkedItems] = useState(() => {
    const saved = localStorage.getItem('checkedItems');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const { taskId } = useParams(); // Get taskId from URL params

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.data.items);
  const selectedTask = useSelector((state) => state.data.selectedTask);
  const status = useSelector((state) => state.data.status);

  useEffect(() => {
    if (taskId) {
      dispatch(getSingleTask(taskId)); // Fetch the single task
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

  const convertTasksToDateObjects = (tData) => {
    return tData.map((task) => ({
      ...task,
      date: new Date(task.date),
    }));
  };

  const convertedTasks = convertTasksToDateObjects(tasks);
  console.log(convertedTasks);

  const [list, setList] = useState([]);

  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    const response = await axios.get(
      'https://to-do-list-mu-green.vercel.app/lists'
    );
    if (response.status === 200) {
      setList(response.data);
    }
  };

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
    return <div className="col-md-8 float-end">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="col-md-8 float-end">Error loading data</div>;
  }

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayTasks = convertedTasks.filter(
        (task) => new Date(task.date).toDateString() === date.toDateString()
      );
      return dayTasks.map((task) => (
        <div
          key={task.id}
          className="highlighted-date bg-warning bg-opacity-25"
        ></div>
      ));
    }
    return null;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const getTasksForSelectedDate = () => {
    if (!selectedDate) return [];
    const taskData = convertedTasks.filter((task) => {
      const taskDate = new Date(task.date);
      const today = new Date();

      taskDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      return taskDate >= today;
    });
    return taskData.filter(
      (task) => task.date.toDateString() === selectedDate.toDateString()
    );
  };

  const handleCloseModalOne = () => {
    setShowModalOne(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <MDBCol className={`${isSidebarOpen ? 'content-shifted' : 'content'}`}>
      <MDBContainer>
        <MDBTypography tag="div">
          <h1>Task Calendar</h1>
          <Calendar
            tileContent={renderTileContent}
            onClickDay={handleDayClick}
          />
          {selectedDate && (
            <div className="task-list">
              <h2>Tasks for {selectedDate.toDateString()}</h2>
              <ul>
                {getTasksForSelectedDate().map((task) => (
                  <MDBListGroupItem
                    key={task.id}
                    className={`${checkedItems[task.id] ? 'd-none' : ''} d-flex justify-content-between align-items-start border border-2 rounded mt-2 p-3`}
                  >
                    <div className="ms-2 me-auto">
                      <div className="text-capitalize fw-bold">
                        {task.title}
                      </div>
                      <Badge>{task.category}</Badge>
                    </div>
                    <MDBBtn
                      onClick={() => onEditTask(task)}
                      className="me-1 rounded-pill btn-outline-info"
                    >
                      <MDBIcon fas icon="edit" size="lg" />
                    </MDBBtn>
                    <MDBBtn
                      onClick={() => handleGetSingleTask(task.id)}
                      className="me-1 rounded-pill btn-outline-secondary"
                    >
                      <MDBIcon fas icon="eye" size="lg" />
                    </MDBBtn>
                    <MDBBtn
                      onClick={() => handleDelete(task.id)}
                      className="me-1 rounded-pill btn-outline-danger"
                    >
                      <MDBIcon fas icon="trash" size="lg" />
                    </MDBBtn>
                  </MDBListGroupItem>
                ))}
                <ModalOne show={showModalOne} onClose={handleCloseModalOne}>
                  {selectedTask ? (
                    <MDBContainer
                      className="border p-3 rounded bg-light"
                      key={selectedTask.id}
                      style={{ textAlign: 'start' }}
                    >
                      <h5 className="fw-bold text-center">Task Details:</h5>
                      <div className="fs-4 border bg-warning bg-opacity-25 p-2 rounded mb-2">
                        <span className="fw-bold text-muted">Title: </span>
                        {selectedTask.title}
                      </div>
                      <div className="fs-4 border bg-warning bg-opacity-25 p-2 rounded mb-2">
                        <span className="fw-bold text-muted">
                          Description:{' '}
                        </span>
                        {selectedTask.description}
                      </div>
                      <div className="fs-4 border bg-warning bg-opacity-25 p-2 rounded mb-2">
                        <span className="fw-bold text-muted">Category: </span>
                        {selectedTask.category}
                      </div>
                      <div className="fs-4 border bg-warning bg-opacity-25 p-2 rounded mb-2">
                        <span className="fw-bold text-muted">Due date: </span>
                        {selectedTask.date}
                      </div>
                      <MDBBtn
                        className="me-1"
                        color="info"
                        onClick={() => onEditTask(selectedTask)}
                      >
                        <MDBIcon fas icon="edit" size="lg" />
                      </MDBBtn>
                      <MDBBtn
                        color="danger"
                        onClick={() => handleDelete(selectedTask.id)}
                      >
                        <MDBIcon fas icon="trash" size="lg" />
                      </MDBBtn>
                    </MDBContainer>
                  ) : (
                    <div>No task found</div>
                  )}
                </ModalOne>
                <Modal show={showModal} onClose={handleCloseModal}>
                  <MDBContainer>
                    <h5 className="fw-bold">
                      {currentTask ? 'Update Task' : 'Add New Task'}
                    </h5>
                    <form onSubmit={handleSubmit}>
                      <MDBInput
                        required
                        className="mb-4"
                        type="text"
                        id="form1Example4"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                      <MDBTextArea
                        className="mb-4"
                        label="Description"
                        id="textAreaExample"
                        rows="{6}"
                        name="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                      <select
                        className="form-select mb-4"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                      >
                        <option>Select Category</option>
                        {list &&
                          list.map((item) => (
                            <option value={item.option} key={item.id}>
                              {item.option}
                            </option>
                          ))}
                      </select>
                      <MDBInput
                        required
                        className="mb-4"
                        type="date"
                        id="form1Example8"
                        label="date"
                        name="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                      />
                      <MDBBtn type="submit" block className="bg-secondary">
                        {currentTask ? 'Save Changes' : 'Add Task'}
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
  );
};

Calendar1.propTypes = {
  isSidebarOpen: PropTypes.bool,
  onEditTask: PropTypes.any,
  currentTask: PropTypes.any,
  setCurrentTask: PropTypes.any,
  showModal: PropTypes.any,
  setShowModal: PropTypes.any,
};

export default Calendar1;
