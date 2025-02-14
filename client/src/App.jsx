import { Route, Routes, BrowserRouter } from 'react-router'
import './App.css'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import TaskHome from './components/TaskHome'
import Today from "./components/Today"
import Upcoming from "./components/Upcoming"
import Calendar1 from "./components/Calendar1"
import StickyNotes from "./components/StickyNotes"
import Work from "./components/Work"
import Personal from "./components/Personal"


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="tasks/*" element={<TaskHome />} >
          <Route index element={<Today />} /> {/* Default route for /tasks */}
          <Route path="today" element={<Today />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="calendar" element={<Calendar1 />} />
          <Route path="notes" element={<StickyNotes />} />
          <Route path="work" element={<Work />} />
          <Route path="personal" element={<Personal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App