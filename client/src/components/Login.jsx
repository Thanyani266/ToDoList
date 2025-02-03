import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import ogneb from '../assets/ogneb-1.png'
import { Link, useNavigate } from "react-router"
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.post('http://localhost:5000/login', ({email, password}), {withCredentials: true});
            if(response){
                localStorage.setItem('login', JSON.stringify(response.data))
                navigate('/tasks')
                navigate(0)
            }
        }catch(err){
            console.log('Error caught:', err); // Log the error
            if (err.response && err.response.data) {
                setErr(err.response.data || 'Login failed.'); // Display the server error message
                console.log('Error message set:', err.response.data)
            } else {
                setErr('An unexpected error occurred.');
            }
            console.log(err);
        }
    }
  return (
    <MDBContainer>
            <MDBRow className='mb-5 gap-2'>
                <MDBCol md='6' sm='12' className='p-2 bg-danger bg-opacity-25 my-5 text-center rounded border border-2 border-dark'>
                    <img
                        src={ogneb}
                        className='img-fluid'
                        alt=''
                    />
                </MDBCol>
                <MDBCol md='5' sm='12' className='p-2 my-5 rounded'>
                    <MDBContainer className='mt-5'>
                        <MDBTypography tag='h5' className='display-6 fs4 fw-bold text-muted pb-3 mb-3 text-center text-capitalize'>
                            Sign In
                        </MDBTypography>
                        <form onSubmit={handleSubmit}>
                            <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' name='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                            <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />

                            <MDBBtn type='submit' block className='bg-secondary'>
                                Sign In
                            </MDBBtn>
                        </form>
                        {err && <MDBTypography tag='p' className='text-danger text-center my-2'>{err}</MDBTypography>}
                        <MDBTypography  tag="div"  className='my-3 text-center'>
                            Or
                        </MDBTypography>
                        <MDBBtn type='submit' className='bg-danger bg-opacity-50' block>
                            Sign In With Google
                        </MDBBtn>
                        <MDBTypography tag="p" className='text-center fw-bold my-3'>
                            Don&apos;t have an account? <Link to="/register" className='text-warning'>Register</Link>
                        </MDBTypography>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
  )
}

export default Login
