import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { UserContext } from './UserContext';

// Create a context with default value

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('https://to-do-list-mu-green.vercel.app/user', {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
