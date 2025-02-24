import { useState } from 'react';
//import DataList from './components/DataList';
import Today from './components/Today';
import NewTaskForm from './components/NewTaskForm';
import DataList from './components/DataList';

const App = () => {
  const [currentTask, setCurrentTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true)
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <NewTaskForm currentTask={currentTask} setCurrentTask={setCurrentTask} />
      <DataList onEditTask={handleEditTask} />
      <Today onEditTask={handleEditTask}  currentTask={currentTask} setCurrentTask={setCurrentTask} showModal={showModal} setShowModal={setShowModal}/>
    </div>
  );
};

export default App;


/*import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
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
import TaskView from './components/TaskView';

const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
  <Router>
    <MDBContainer>
      <MDBRow className="py-1">
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Routes>
              <Route index element={<Today context={{ isSidebarOpen }}/>} />
              <Route path='upcoming' element={<Upcoming context={{ isSidebarOpen }}/>} />
              <Route path='calendar' element={<Calendar1 context={{ isSidebarOpen }} />} />
              <Route path='notes' element={<StickyNotes context={{ isSidebarOpen }} />} />
              <Route path='personal' element={<Personal context={{ isSidebarOpen }} />} />
              <Route path='work' element={<Work context={{ isSidebarOpen }} />} />
              <Route path='/taskview/:id' element={<TaskView context={{ isSidebarOpen }} />} />
            </Routes>
      </MDBRow>
    </MDBContainer>
  </Router>
      
  );
};

export default App; */
