import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';


import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import Today from './components/Today';
import Upcoming from './components/Upcoming';
import Sideshit from './components/Sideshit';
import Calendar1 from './components/Calendar1';
import StickyNotes from './components/StickyNotes';
import Personal from './components/Personal';
import Work from './components/Work';

const App = () => {

  return (
  <Router>
    <MDBContainer>
      <MDBRow className="py-1">
          <Sideshit />
            <Routes>
              <Route index element={<Today />} />
              <Route path='upcoming' element={<Upcoming />} />
              <Route path='calendar' element={<Calendar1 />} />
              <Route path='notes' element={<StickyNotes />} />
              <Route path='personal' element={<Personal />} />
              <Route path='work' element={<Work />} />
            </Routes>
      </MDBRow>
    </MDBContainer>
  </Router>
      
  );
};

export default App;
