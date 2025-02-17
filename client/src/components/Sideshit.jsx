import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBListGroup, MDBListGroupItem, MDBNavbar, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import '../App.css'
import { Link, useLocation } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";


const Sideshit = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const location = useLocation()

  console.log(activeTab)

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
            <Link to='/upcoming' onClick={() => setActiveTab("Upcoming")}><MDBListGroupItem className={`${activeTab === "Upcoming" ? "active text-warning bg-seconary" : ""} border rounded px-2 mb-3 py-2`}><MDBIcon fas icon="angle-double-right"  className="me-2" /> Upcoming <MDBTypography tag='span' className={`${activeTab === "Upcoming" ? "text-dark bg-warning bg-opacity-75" : ""} float-end ms-auto border bg-secondary px-2 text-light rounded`}>3</MDBTypography></MDBListGroupItem></Link>
            <Link to='/' onClick={() => setActiveTab("Today")}><MDBListGroupItem className={`${activeTab === "Today" ? "active text-warning bg-seconary" : ""} border rounded px-2 mb-3 py-2`}><MDBIcon fas icon="calendar-day" className="me-2"/> Today <MDBTypography tag='span' className={`${activeTab === "Today" ? "text-dark bg-warning bg-opacity-75" : ""}  float-end ms-auto border bg-secondary px-2 text-light rounded`}>0</MDBTypography></MDBListGroupItem></Link>
            <Link to='/calendar' onClick={() => setActiveTab("Calendar")}><MDBListGroupItem className={`${activeTab === "Calendar" ? "active text-warning bg-seconary" : ""} border rounded px-2 mb-3 py-2`}><MDBIcon fas icon="calendar-alt"  className="me-2" /> Calendar</MDBListGroupItem></Link>
            <Link to='/notes' onClick={() => setActiveTab("Sticky")}><MDBListGroupItem className={`${activeTab === "Sticky" ? "active text-warning bg-seconary" : ""} border rounded px-2 py-2 mb-3`}><MDBIcon fas icon="sticky-note"  className="me-2" /> Sticky Wall</MDBListGroupItem></Link>
          </MDBListGroup>
          <MDBTypography tag='p' className="fs6 mt-5 text-uppercase fw-bold">  
            Lists
          </MDBTypography>
          <MDBListGroup light className="border-bottom">
            <Link to='/work' onClick={() => setActiveTab('Work')}><MDBListGroupItem className={`${activeTab === `Work` ? "active text-warning bg-secondary bg-opacity-25" : ""} border rounded px-2 mb-2 py-2`}><MDBIcon fas icon="tag" className={`${activeTab === `Work` ? "active text-warning bg-transparent" : ""} me-2 text-dark`}/> Work <MDBTypography tag='span' className={`${activeTab === "Work" ? "text-dark bg-warning bg-opacity-75" : ""} float-end ms-auto border bg-secondary px-2 text-light rounded`}>0</MDBTypography></MDBListGroupItem></Link>
            <Link to='/personal' onClick={() => setActiveTab('Personal')}><MDBListGroupItem className={`${activeTab === `Personal` ? "active text-warning bg-secondary bg-opacity-25" : ""} border rounded px-2 mb-2 py-2`}><MDBIcon fas icon="tag" className={`${activeTab === `Personal` ? "active text-warning bg-transparent" : ""} me-2 `}/> Personal <MDBTypography tag='span' className={`${activeTab === "Personal" ? "text-dark bg-warning bg-opacity-75" : ""} float-end ms-auto border bg-secondary px-2 text-light rounded`}>2</MDBTypography></MDBListGroupItem></Link>
            
            <MDBListGroupItem><MDBBtn className="w-100 text-start mt-2 bg-transparent border text-success disabled"><MDBIcon fas icon="plus" className="me-2" /> new list </MDBBtn></MDBListGroupItem>
          </MDBListGroup>
          <MDBListGroup className="border-none py-3">
            <MDBBtn className="btn-outline-dark"><MDBIcon fas icon="sign-out-alt" className="me-2"/> Sign Out</MDBBtn>
          </MDBListGroup>
        </MDBContainer>
    </MDBCol>
    </>
  )
}

export default Sideshit