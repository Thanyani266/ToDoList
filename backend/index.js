const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const listsRoutes = require('./routes/lists')
const notesRoutes = require('./routes/notes')
const postsRoutes = require('./routes/tasks')
const usersRoutes = require('./routes/users')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
const port = 5000;

app.use(bodyParser.json());
// Allow request from any IP
app.use(cors({
    origin: 'https://to-do-list-client.netlify.app',
    credentials: true, // This ensures that the `Access-Control-Allow-Credentials` header is set to `true`
    optionsSuccessStatus: 200
}));
app.use(cookieParser());

// built-in middleware to handle json data 
app.use(express.json())

app.use(express.static('images'))

app.use('/', listsRoutes)
app.use('/', notesRoutes)
app.use('/', postsRoutes)
app.use('/', usersRoutes)

app.get('/', (req, res) => res.send("Hello from express server"));
app.all('*', (req, res) => res.send("That route doesn't exist"));

app.listen(port, () => console.log(`Server is listening on port: ${port}`));