const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleNewUser = async (req, res) => {
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

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send("Email and Password Required!")

    const foundUser = usersDB.users.find(person => person.email === email)
    if(!foundUser) return res.status(401).send("Email or password is invalid!"); // unathorized

    // Evaluate password
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        // crate JWTs
        const accessToken = jwt.sign(
            {"email": foundUser.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        )
        const refreshToken = jwt.sign(
            {"email": foundUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        // saving refresh token with current user
        const otherUsers = usersDB.users.filter(person => person.email !== foundUser.email)
        const currentUser = { ...foundUser, refreshToken }
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt', refreshToken)
        res.json(req.cookies)
    }else{
        res.status(401).send("Incorrect email or password!")
    }
}

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // No Content
    const refreshToken = cookies.jwt

    // is refreshtoken in db
    const foundUser = usersDB.users.find(person => person.refreshToken == refreshToken)
    
    if(!foundUser) {
        res.clearCookie('jwt', refreshToken)//{httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        return res.sendStatus(204); 
    }

    // Delete the refreshToken in the db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''}
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(usersDB.users)
    );
    res.clearCookie('jwt', refreshToken) //{httpOnly: true, maxAge: 24 * 60 * 60 * 1000});   secure: true - only serves on https
    res.sendStatus(204)
}

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
    /*
    jwt.verify(
        refreshToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403); // invalid token
            req.email = decoded.email;
            req.username = decoded.username;
            next();
        }
    );
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403); // invalid token
            req.user = decoded.username;
            next();
        }
    ); */
}

const userInfo = (req, res) => { 
    const cookies = req.cookies
    if (!cookies?.jwt) return res.json({"message": "No cookies"});
    const refreshToken = cookies.jwt;
    console.log(refreshToken);

    const foundUser = usersDB.users.find(person => person.refreshToken == refreshToken)
    console.log(foundUser)
    if(!foundUser) return res.sendStatus(403); 
    res.json(foundUser)
}

module.exports = { handleNewUser, handleLogin, userInfo, handleRefreshToken, handleLogout, verifyUser }