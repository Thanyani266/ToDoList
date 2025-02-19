import axios from 'axios'
import { MDBCol, MDBContainer, MDBTypography } from 'mdb-react-ui-kit'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router';

const TaskView = () => {

    const [task, setTask] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        if(id) {
            getSingleTask(id)
        }
      }, [id])

      const getSingleTask = async (id) => {
        const response = await axios.get(`https://to-do-list-mu-green.vercel.app/task/${id}`)
        if (response.status === 200) {
            setTask({...response.data[0]});
          }
      }
  return (
    <MDBCol md='4'>
        <MDBContainer>
        <Link to='/' ><strong>Go Back</strong></Link>
        <MDBTypography tag='h2' className='text-muted text-center mt-2'>{task && task.title}</MDBTypography>
        </MDBContainer>
    </MDBCol>
  )
}

export default TaskView
