import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBListGroup, MDBListGroupItem, MDBNavbar, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import { Link } from "react-router"
//import { useContext } from "react"
//import { userContext } from "../context/authContext"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import '../App.css'


const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const [tData, setTData] = useState([]);
  
  const location = useLocation()

  useEffect(() => {
    getTasks();
  }, [])

  const getTasks = async () => {
    const response = await axios.get('https://to-do-list-mu-green.vercel.app/tasks')
    if (response.status === 200) {
      setTData(response.data)
    }
  }


  
  useEffect(() => {
    if (location.pathname === '/today') {
      setActiveTab("Today")
    }else if (location.pathname === '/upcoming') {
      setActiveTab("Upcoming")
    }else if (location.pathname === '/calendar') {
      setActiveTab("Calendar")
    }else if (location.pathname === '/notes') {
      setActiveTab("Sticky")
    }else if (location.pathname === '/personal') {
      setActiveTab("Personal")
    }else if (location.pathname === '/work') {
      setActiveTab("Work")
    }
  }, [location])
  const handleLogout = () => {
    axios.get('https://to-do-list-mu-green.vercel.app/logout')
    .then(res => {
      if(res){
        window.location.href = '/'
      }
    })
  }

  const isToday = (someDate) => {
    const today = new Date();
    const dateToCompare = new Date(someDate);
    return dateToCompare.getDate() === today.getDate() &&
           dateToCompare.getMonth() === today.getMonth() &&
           dateToCompare.getFullYear() === today.getFullYear();
  };

  const isTomorrow = (someDate) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date
  
    const dateToCompare = new Date(someDate); // Convert the date string to a Date object
    return dateToCompare.getDate() === tomorrow.getDate() &&
           dateToCompare.getMonth() === tomorrow.getMonth() &&
           dateToCompare.getFullYear() === tomorrow.getFullYear();
  };

  const getNextWeekend = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 6 = Saturday)
    const nextSaturday = new Date(today);
    const nextSunday = new Date(today);
  
    // Calculate the number of days until the next Saturday and Sunday
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7; // Number of days until next Saturday
    const daysUntilSunday = (7 - dayOfWeek + 7) % 7; // Number of days until next Sunday
  
    nextSaturday.setDate(today.getDate() + daysUntilSaturday);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
  
    return { nextSaturday, nextSunday };
  };

  const isNextWeekend = (someDate) => {
    const { nextSaturday, nextSunday } = getNextWeekend();
    const dateToCompare = new Date(someDate); // Convert the date string to a Date object
  
    return (dateToCompare.getDate() === nextSaturday.getDate() &&
            dateToCompare.getMonth() === nextSaturday.getMonth() &&
            dateToCompare.getFullYear() === nextSaturday.getFullYear()) ||
           (dateToCompare.getDate() === nextSunday.getDate() &&
            dateToCompare.getMonth() === nextSunday.getMonth() &&
            dateToCompare.getFullYear() === nextSunday.getFullYear());
  };

  const todayTasks = tData.filter(task => isToday(task.date));
  const tomorrowTasks = tData.filter(task => isTomorrow(task.date));
  const weekendTasks = tData.filter(task => isNextWeekend(task.date));

  const personalData = tData.filter(task => {
    const taskDate = new Date(task.date);
    const today = new Date();

    taskDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    return taskDate >= today;
});

const personalTasks = personalData.filter(task => task.category === 'Personal');

const workData = tData.filter(task => {
  const taskDate = new Date(task.date);
  const today = new Date();

  taskDate.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  return taskDate >= today;
});

const workTasks = workData.filter(task => task.category === 'Work');

  return (
    <>
    <header> 
      <MDBNavbar expand='lg' light bgColor='white' fixed>
        <MDBContainer fluid>
          <MDBBtn className={`btn-outline-warning`}>
            <MDBIcon fas icon='bars' size="lg" />
          </MDBBtn>
        </MDBContainer>
      </MDBNavbar>
    </header>
    <MDBCol md='3' className={`sidebar`}>
        <MDBContainer className="border border-2 border-warning rounded shadow">
          <MDBRow className="d-flex border-bottom">
            
          <MDBTypography tag='span' className="fw-bold p-2">
            Welcome, User<MDBIcon fas icon="times" className="float-end ms-auto display-6 border border-2 rounded" style={{cursor: 'pointer'}} />
          </MDBTypography>
          </MDBRow>
          <MDBTypography tag='p' className="fs6 mt-2 text-uppercase fw-bold">
            Tasks
          </MDBTypography>
          <MDBListGroup light>
            <Link to='/tasks/upcoming' onClick={() => setActiveTab("Upcoming")}><MDBListGroupItem className={`${activeTab === "Upcoming" ? "active text-warning bg-seconary" : ""} border rounded px-2 mb-3 py-2`}><MDBIcon fas icon="angle-double-right"  className="me-2" /> Upcoming <MDBTypography tag='span' className={`${activeTab === "Upcoming" ? "text-dark bg-warning bg-opacity-75" : ""} float-end ms-auto border bg-secondary px-2 text-light rounded`}>{todayTasks.length+tomorrowTasks.length+weekendTasks.length}</MDBTypography></MDBListGroupItem></Link>
            <Link to='/tasks/today' onClick={() => setActiveTab("Today")}><MDBListGroupItem className={`${activeTab === "Today" ? "active text-warning bg-seconary" : ""} border rounded px-2 mb-3 py-2`}><MDBIcon fas icon="calendar-day" className="me-2"/> Today <MDBTypography tag='span' className={`${activeTab === "Today" ? "text-dark bg-warning bg-opacity-75" : ""}  float-end ms-auto border bg-secondary px-2 text-light rounded`}>{todayTasks.length}</MDBTypography></MDBListGroupItem></Link>
            <Link to='/tasks/calendar' onClick={() => setActiveTab("Calendar")}><MDBListGroupItem className={`${activeTab === "Calendar" ? "active text-warning bg-seconary" : ""} border rounded px-2 mb-3 py-2`}><MDBIcon fas icon="calendar-alt"  className="me-2" /> Calendar</MDBListGroupItem></Link>
            <Link to='/tasks/notes' onClick={() => setActiveTab("Sticky")}><MDBListGroupItem className={`${activeTab === "Sticky" ? "active text-warning bg-seconary" : ""} border rounded px-2 py-2 mb-3`}><MDBIcon fas icon="sticky-note"  className="me-2" /> Sticky Wall</MDBListGroupItem></Link>
          </MDBListGroup>
          <MDBTypography tag='p' className="fs6 mt-5 text-uppercase fw-bold">  
            Lists
          </MDBTypography>
          <MDBListGroup light className="border-bottom">
            <Link to='/tasks/work' onClick={() => setActiveTab('Work')}><MDBListGroupItem className={`${activeTab === `Work` ? "active text-warning bg-secondary bg-opacity-25" : ""} border rounded px-2 mb-2 py-2`}><MDBIcon fas icon="tag" className={`${activeTab === `Work` ? "active text-warning bg-transparent" : ""} me-2 text-dark`}/> Work <MDBTypography tag='span' className={`${activeTab === "Work" ? "text-dark bg-warning bg-opacity-75" : ""} float-end ms-auto border bg-secondary px-2 text-light rounded`}>{workTasks.length}</MDBTypography></MDBListGroupItem></Link>
            <Link to='/tasks/personal' onClick={() => setActiveTab('Personal')}><MDBListGroupItem className={`${activeTab === `Personal` ? "active text-warning bg-secondary bg-opacity-25" : ""} border rounded px-2 mb-2 py-2`}><MDBIcon fas icon="tag" className={`${activeTab === `Personal` ? "active text-warning bg-transparent" : ""} me-2 `}/> Personal <MDBTypography tag='span' className={`${activeTab === "Personal" ? "text-dark bg-warning bg-opacity-75" : ""} float-end ms-auto border bg-secondary px-2 text-light rounded`}>{personalTasks.length}</MDBTypography></MDBListGroupItem></Link>
            
            <MDBListGroupItem><MDBBtn className="w-100 text-start mt-2 bg-transparent border text-success disabled"><MDBIcon fas icon="plus" className="me-2" /> new list </MDBBtn></MDBListGroupItem>
          </MDBListGroup>
          <MDBListGroup className="border-none py-3">
            <MDBBtn onClick={handleLogout} className="btn-outline-dark"><MDBIcon fas icon="sign-out-alt" className="me-2"/> Sign Out</MDBBtn>
          </MDBListGroup>
        </MDBContainer>
    </MDBCol>
    </>
  )
}

export default Sidebar