
import axios from 'axios';
import { MDBCol, MDBTypography } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const TaskList = () => {
  const { category } = useParams();
  const [tasks, setTasks] = useState([])
    //const { user } = useContext(UserContext);

    useEffect(() => {
      fetchTasks(category)
    }, [category])

    const fetchTasks = async (category) => {
        try {
            const response = await axios.get(`http://localhost:5000/tasks/${category}`);
            if (response.status === 200) {
                setTasks(response.data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
      <MDBCol md='8'>
        <MDBTypography tag='span' className="fw-bold display-6 py-5">
            {category} <MDBTypography tag='span' className="float-end ms-auto border bg-secondary px-2 text-light rounded">5</MDBTypography>
        </MDBTypography>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{tasks}</li>
          ))}
        </ul>
      </MDBCol>
)}

export default TaskList