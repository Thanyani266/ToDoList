import { MDBContainer, MDBRow } from "mdb-react-ui-kit"
import Sidebar from "./Sidebar"
import { Outlet} from "react-router"
import { useState } from "react";



const TaskHome = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <MDBContainer>
      <MDBRow className="py-1">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Outlet isSidebarOpen={isSidebarOpen}/>
      </MDBRow>
    </MDBContainer>
  )
}

export default TaskHome
