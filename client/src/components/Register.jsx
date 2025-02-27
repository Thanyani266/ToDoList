import { Link, useNavigate } from 'react-router';
import ogneb from '../assets/ogneb-1.png';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        'https://to-do-list-mu-green.vercel.app/register',
        { username, email, password }
      );
      console.log('Response received:', res); // Log the response
      if (res.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      console.log('Error caught:', err); // Log the error
      if (err.response && err.response.data) {
        setErr(err.response.data || 'Registration failed.'); // Display the server error message
        console.log('Error message set:', err.response.data);
      } else {
        setErr('An unexpected error occurred.');
      }
      console.log(err); // Log the error for debugging purposes
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="mb-5 gap-2">
        <MDBCol
          md="6"
          sm="12"
          className="p-2 bg-danger bg-opacity-25 my-5 text-center rounded border border-2 border-dark"
        >
          <img src={ogneb} className="img-fluid" alt="" />
        </MDBCol>
        <MDBCol md="5" sm="12" className="p-2 my-5 rounded">
          <MDBContainer className="mt-5">
            <MDBTypography
              tag="h5"
              className="display-6 fs4 fw-bold text-muted pb-3 mb-3 text-center text-capitalize"
            >
              Create new account
            </MDBTypography>
            <form onSubmit={handleSubmit}>
              <MDBInput
                className="mb-4"
                type="text"
                id="form1Example4"
                label="Username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <MDBInput
                className="mb-4"
                type="email"
                id="form1Example1"
                label="Email address"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <MDBInput
                className="mb-4"
                type="password"
                id="form1Example2"
                label="Password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <MDBBtn type="submit" block className="bg-secondary">
                Register
              </MDBBtn>
              {err && (
                <MDBTypography tag="p" className="text-danger text-center my-2">
                  {err}
                </MDBTypography>
              )}
            </form>
            <MDBTypography tag="div" className="my-3 text-center">
              Or
            </MDBTypography>
            <MDBBtn type="submit" className="bg-danger bg-opacity-50" block>
              Sign In With Google
            </MDBBtn>
            <MDBTypography tag="p" className="text-center fw-bold my-3">
              Already have an account?{' '}
              <Link to="/login" className="text-warning">
                Sign in
              </Link>
            </MDBTypography>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
