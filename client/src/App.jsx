import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';


import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import Today from './components/Today';
import Upcoming from './components/Upcoming';
import Sidebar from './components/Sidebar';
import Calendar1 from './components/Calendar1';
import StickyNotes from './components/StickyNotes';
import Personal from './components/Personal';
import Work from './components/Work';
import { useState } from 'react';

const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true)
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setShowModal(true)
  };

  return (
  <Router>
    <MDBContainer>
      <MDBRow className="py-1">
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Routes>
              <Route index element={<Today context={{ isSidebarOpen }} onEditTask={handleEditTask}  currentTask={currentTask} setCurrentTask={setCurrentTask} showModal={showModal} setShowModal={setShowModal}/>} />
              <Route path='upcoming' element={<Upcoming context={{ isSidebarOpen }} onEditTask={handleEditTask}  currentTask={currentTask} setCurrentTask={setCurrentTask} showModal={showModal} setShowModal={setShowModal}/>} />
              <Route path='calendar' element={<Calendar1 context={{ isSidebarOpen }} onEditTask={handleEditTask}  currentTask={currentTask} setCurrentTask={setCurrentTask} showModal={showModal} setShowModal={setShowModal} />} />
              <Route path='notes' element={<StickyNotes context={{ isSidebarOpen }} onEditNote={handleEditNote}  currentNote={currentNote} setCurrentNote={setCurrentNote} showModal={showModal} setShowModal={setShowModal} />} />
              <Route path='personal' element={<Personal context={{ isSidebarOpen }} onEditTask={handleEditTask}  currentTask={currentTask} setCurrentTask={setCurrentTask} showModal={showModal} setShowModal={setShowModal} />} />
              <Route path='work' element={<Work context={{ isSidebarOpen }} onEditTask={handleEditTask}  currentTask={currentTask} setCurrentTask={setCurrentTask} showModal={showModal} setShowModal={setShowModal} />} />
            </Routes>
      </MDBRow>
    </MDBContainer>
  </Router>
      
  );
};

export default App; 
