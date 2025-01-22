import { Link } from 'react-router';
import ogneb from '../assets/ogneb-1.png'
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

const Register = () => {
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
                            Create new account
                        </MDBTypography>
                        <form>
                            <MDBInput className='mb-4' type='text' id='form1Example4' label='Username' />
                            <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' />
                            <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' />

                            <MDBBtn type='submit' block className='bg-secondary'>
                                Register
                            </MDBBtn>
                        </form>
                        <MDBTypography  tag="div"  className='my-3 text-center'>
                            Or
                        </MDBTypography>
                        <MDBBtn type='submit' className='bg-danger bg-opacity-50' block>
                            Sign In With Google
                        </MDBBtn>
                        <MDBTypography tag="p" className='text-center fw-bold my-3'>
                            Already have an account? <Link to="/login" className='text-warning'>Sign in</Link>
                        </MDBTypography>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
  }
  
  export default Register