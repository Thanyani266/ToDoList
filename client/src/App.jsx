import { Route, Routes, BrowserRouter, Navigate } from 'react-router'
import './App.css'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import TaskHome from './components/TaskHome'
import Upcoming from './components/Upcoming'
import Today from './components/Today'
import StickyNotes from './components/StickyNotes'
import Calendar1 from './components/Calendar1'
import Work from './components/Work'
import Personal from './components/Personal'


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/tasks" element={<TaskHome />} >
          <Route path='today' element={<Today />} />
          <Route path='upcoming' element={<Upcoming />} />
          <Route path='calendar' element={<Calendar1 />} />
          <Route path='notes' element={<StickyNotes />} />
          <Route path='work' element={<Work />} />
          <Route path='personal' element={<Personal />} />
          <Route path='' element={<Navigate to='today' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App