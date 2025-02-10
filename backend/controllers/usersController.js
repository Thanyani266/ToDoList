// required packages
const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Helper function to fetch users from JSON-Server
const getUsers = async () => {
    const response = await fetch('https://json-server-data-5js7.onrender.com/users');
    const users = await response.json();
    return users;
}

// Helper function to add new user to JSON-Server
async function addUser(newUser) {
    try {
      const response = await fetch('https://json-server-data-5js7.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
  
      const responseData = await response.text(); // Get the raw response text
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText} - ${responseData}`);
      }
  
      const user = JSON.parse(responseData); // Parse the JSON from the raw response text
      return user;
    } catch (error) {
      console.error('Failed to add user:', error);
      throw error;
    }
  }
  
  
  // Registration endpoint
  const handleNewUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).send("Input Field(s) Empty!");
      }
      const users = await getUsers();
  
      const usernameExists = users.some(u => u.username === username);
      const userEmailExists = users.some(u => u.email === email);
      if (usernameExists && userEmailExists) {
        return res.status(400).send('Both username and email already exist');
      } else if (usernameExists) {
        return res.status(400).send('Username already exists');
      } else if (userEmailExists) {
        return res.status(400).send('Email already exists');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { username, email, password: hashedPassword };
  
      const savedUser = await addUser(newUser);
      res.json(savedUser);
    } catch (error) {
      res.status(500).send(`Server error: ${error.message}`);
    }
  };
  

// new user creating an account
const handleNewUser1 = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).send("Input Field(s) Empty!")

    // check for username duplicates in the db
    const duplicate = usersDB.users.find(person => person.username === username || person.email === email)
    if (duplicate) return res.status(409).send("Username or email already exist!") // conflict
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10)
        // store the new user
        const newUser = {'username': username, 'email': email, 'password': hashedPwd}
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({'success': `New user ${username} created`})
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(`https://json-server-data-5js7.onrender.com/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
  
      const responseData = await response.text();
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText} - ${responseData}`);
      }
  
      const user = JSON.parse(responseData);
      return user;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }

// user logging in
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send("Email and Password Required!");
        const users = await getUsers();
        console.log(users)
        const foundUser = users.find(u => u.email === email);
    
        if (!foundUser) {
          return res.status(400).send('User not found');
        }
    
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
          // Create JWTs
          const accessToken = jwt.sign(
            { email: foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
          );
          const refreshToken = jwt.sign(
            { email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
          );
    
          // Save refresh token with current user
          const updatedUser = { ...foundUser, refreshToken };
          await updateUser(updatedUser);
    
          res.cookie('jwt', refreshToken);
          res.json({ accessToken });
        } else {
          res.status(401).send("Incorrect username or password!");
        }
    } catch (error) {
        res.status(500).send(`Server error: ${error.message}`);
    }
}

// user logging out
const handleLogout = async (req, res) => {
    try {
      // On client, also delete the accessToken
      const cookies = req.cookies;
      console.log(cookies.jwt)
      if (!cookies.jwt) return res.status(204).send('No cookie(s) found!'); // No Content
      const refreshToken = cookies.jwt;
  
      // Fetch users from JSON-Server
      const users = await getUsers();
  
      // Is refreshToken in database?
      const foundUser = users.find(person => person.refreshToken === refreshToken);
  
      if (!foundUser) {
        res.clearCookie('jwt');
        return res.status(204).send('matshimba!');
      }
  
      // Delete the refreshToken in the database
      const updatedUser = { ...foundUser, refreshToken: '' };
      await updateUser(updatedUser);
  
      res.clearCookie('jwt'); // secure: true - only serves on https
      res.status(204).send('user logged out');
    } catch (error) {
      res.status(500).send(`Server error: ${error.message}`);
    }
  };
  

// setting refreshToken for logged in user
const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if(!foundUser) return res.sendStatus(403); 

    // Evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email != decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"username": decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({ foundUser, accessToken })
        }
    );
}

// verifying the user's credentials
const verifyUser = (req, res, next) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    console.log(foundUser)
    if(!foundUser) return res.sendStatus(403); 

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email != decoded.email) return res.sendStatus(403);
            req.email = decoded.email;
            next();
        }
    );
}

// user's details for the context
const userInfo = async (req, res) => { 
    const cookies = req.cookies
    if (!cookies?.jwt) return res.json({"message": "No cookies"});
    const refreshToken = cookies.jwt;
    console.log(refreshToken);

    // Fetch users from JSON-Server
    const users = await getUsers();

    const foundUser = users.find(person => person.refreshToken == refreshToken)
    console.log(foundUser)
    if(!foundUser) return res.sendStatus(403); 
    res.json(foundUser)
}

// export fns
module.exports = { handleNewUser, handleLogin, userInfo, handleRefreshToken, handleLogout, verifyUser }