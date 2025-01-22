import { MDBBadge, MDBBtn, MDBCheckbox, MDBCol, MDBIcon, MDBListGroup, MDBListGroupItem, MDBTypography } from "mdb-react-ui-kit"
import { useState } from "react";


const Today = () => {
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
  return (
    <MDBCol md='8'>
    <MDBTypography tag='span' className="fw-bold display-6 py-5">
            Today <MDBTypography tag='span' className="float-end ms-auto border bg-secondary px-2 text-light rounded">3</MDBTypography>
        </MDBTypography>
    <MDBBtn className="w-100 text-start mt-5 bg-transparent border text-success"><MDBIcon fas icon="plus" className="me-2" /> Add new task </MDBBtn>
    <MDBListGroup light style={{ minWidth: '22rem' }}>
      <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
        <div className='ms-2 me-auto'>
          <div className='text-capitalize fw-bold'>
          <MDBCheckbox
                id='controlledCheckbox'
                label='cooking shit'
                checked={checked}
                onChange={() => setChecked(!checked)}
            /></div><MDBBadge><MDBIcon fas icon="tag" className="me-2 text-danger"/> Personal</MDBBadge>
        </div>
        <MDBIcon fas icon="angle-right" />
      </MDBListGroupItem>
      <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
        <div className='ms-2 me-auto'>
          <div className='text-capitalize fw-bold'>
          <MDBCheckbox
                id='controlledCheckbox'
                label='Blood sacrifice'
                checked={checked1}
                onChange={() => setChecked1(!checked1)}
            /></div><MDBBadge light><MDBIcon fas icon="tag" className="me-2 text-warning"/> List 1</MDBBadge>
        </div>
        <MDBIcon fas icon="angle-right" />
      </MDBListGroupItem>
      <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
        <div className='ms-2 me-auto'>
          <div className='fw-bold text-capitalize'>
          <MDBCheckbox
                id='controlledCheckbox'
                label='Creating a vision board'
                checked={checked2}
                onChange={() => setChecked2(!checked2)}
            /></div><MDBBadge light><MDBIcon fas icon="tag" className="me-2 text-info"/> Work</MDBBadge>
        </div>
        <MDBIcon fas icon="angle-right" />
      </MDBListGroupItem>
    </MDBListGroup>
    </MDBCol>
  )
}

export default Today
