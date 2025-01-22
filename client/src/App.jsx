import { Route, Routes, BrowserRouter } from 'react-router'
import './App.css'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import TaskHome from './components/TaskHome'
import Upcoming from './components/Upcoming'
import Calendar from './components/Calendar'
import Today from './components/Today'
import StickyNotes from './components/StickyNotes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="tasks" element={<TaskHome />} >
          <Route path='today' element={<Today />} />
          <Route path='upcoming' element={<Upcoming />} />
          <Route path='calendar' element={<Calendar />} />
          <Route path='notes' element={<StickyNotes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App