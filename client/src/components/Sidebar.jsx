import { MDBCol, MDBContainer, MDBIcon, MDBListGroup, MDBListGroupItem, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import { Link } from "react-router"


const Sidebar = () => {
  return (
    <MDBCol md='3'>
        <MDBContainer className="border border-danger rounded">
          <MDBRow className="d-flex border-bottom">
          <MDBTypography tag='span' className="fw-bold display-6 p-2">
            Menu  <MDBIcon fas icon="bars" className="float-end"/>
          </MDBTypography>
          </MDBRow>
          <MDBTypography tag='p' className="fs6 mt-2 text-uppercase fw-bold">
            Tasks
          </MDBTypography>
          <MDBListGroup light className="border-bottom">
            <MDBListGroupItem><Link to='upcoming'><MDBIcon fas icon="angle-double-right"  className="me-2" /> Upcoming <MDBTypography tag='span' className="float-end ms-auto border bg-secondary px-2 text-light rounded">12</MDBTypography></Link></MDBListGroupItem>
            <MDBListGroupItem><Link to='today'><MDBIcon fas icon="calendar-day" className="me-2"/> Today <MDBTypography tag='span' className="float-end ms-auto border bg-secondary px-2 text-light rounded">5</MDBTypography></Link></MDBListGroupItem>
            <MDBListGroupItem><Link to='calendar'><MDBIcon fas icon="calendar-alt"  className="me-2" /> Calendar</Link></MDBListGroupItem>
            <MDBListGroupItem><Link to='notes'><MDBIcon fas icon="sticky-note"  className="me-2" /> Sticky Wall</Link></MDBListGroupItem>
          </MDBListGroup>
          <MDBTypography tag='p' className="fs6 mt-2 text-uppercase fw-bold">
            Lists
          </MDBTypography>
          <MDBListGroup light className="border-bottom">
            <MDBListGroupItem><MDBIcon fas icon="tag" className="me-2 text-danger"/> Personal <MDBTypography tag='span' className="float-end ms-auto border bg-secondary px-2 text-light rounded">1</MDBTypography></MDBListGroupItem>
            <MDBListGroupItem><MDBIcon fas icon="tag" className="me-2 text-info"/> Work <MDBTypography tag='span' className="float-end ms-auto border bg-secondary px-2 text-light rounded">3</MDBTypography></MDBListGroupItem>
            <MDBListGroupItem><MDBIcon fas icon="tag"  className="me-2 text-warning" /> List 1 <MDBTypography tag='span' className="float-end ms-auto border bg-secondary px-2 text-light rounded">2</MDBTypography></MDBListGroupItem>
            <MDBListGroupItem><MDBIcon fas icon="plus" className="me-2"/> Add New List</MDBListGroupItem>
          </MDBListGroup>
          <MDBListGroup className="border-none py-3">
            <MDBListGroupItem><MDBIcon fas icon="sign-out-alt" className="me-2"/> Sign Out</MDBListGroupItem>
          </MDBListGroup>
        </MDBContainer>
    </MDBCol>
  )
}

export default Sidebar
