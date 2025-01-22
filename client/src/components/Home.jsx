import ogneb from '../assets/ogneb-1.png'
import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import { Link } from "react-router"


const Home = () => {
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
                    <MDBContainer className='mt-5 py-5'>
                        <MDBTypography tag='h5' className='display-6 fs4 fw-bold text-muted pb-3 mb-3 text-center text-capitalize'>
                            Productive mind
                        </MDBTypography>
                        <MDBTypography tag="p" className='text-center my-3'>
                            With only the features you need, Ogneb is customized for individuals seeking a stress-free way
                            to stay focused on their goals, projects, and tasks.
                        </MDBTypography>
                        <Link to='/register'>
                            <MDBBtn type='submit' block className='bg-warning bg-opacity-50'>
                                Get Started
                            </MDBBtn>
                        </Link>
                        <MDBTypography tag="p" className='text-center fw-bold text-muted my-3'>
                            Already have an account? <Link to="/login" className='text-secondary'>Sign in</Link>
                        </MDBTypography>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
  )
}

export default Home
