import { MDBContainer, MDBRow } from "mdb-react-ui-kit"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router"


const TaskHome = () => {
  return (
    <>
    <MDBContainer>
      <MDBRow className="py-1">
        <Sidebar />
        <Outlet />
      </MDBRow>
    </MDBContainer>
    
    </>
  )
}

export default TaskHome
