import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from "mdb-react-ui-kit"


const StickyNotes = () => {
  return (
    <MDBCol md='8'>
        <MDBTypography tag='span' className="fw-bold display-6">
            Sticky Wall
        </MDBTypography>
        <MDBContainer className="mt-4 border rounded p-5">
            <MDBRow>
            <MDBCol md='4' className="mb-3">
            <MDBCard className="bg-warning bg-opacity-25">
                <MDBCardBody>
                    <MDBCardTitle>Card title</MDBCardTitle>
                    <MDBCardText>
                        Some quick example text to build on the card title and make up the bulk of the card&apos;s content.
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol md='4' className="mb-3">
            <MDBCard className="bg-danger bg-opacity-25">
                <MDBCardBody>
                    <MDBCardTitle>Card title</MDBCardTitle>
                    <MDBCardText>
                        Some quick example text to build on the card title and make up the bulk of the card&apos;s content.
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol md='4' className="mb-3">
            <MDBCard className="bg-success bg-opacity-25">
                <MDBCardBody>
                    <MDBCardTitle>Card title</MDBCardTitle>
                    <MDBCardText>
                        Some quick example text to build on the card title and make up the bulk of the card&apos;s content.
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol md='4' className="mb-3">
            <MDBCard className="bg-dark bg-opacity-50 text-light">
                <MDBCardBody>
                    <MDBCardTitle>Card title</MDBCardTitle>
                    <MDBCardText>
                        Some quick example text to build on the card title and make up the bulk of the card&apos;s content.
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol md='4' className="mb-3 my-auto">
            <MDBCard className="bg-secondary text-center p-5">
            <MDBIcon fas icon="plus" className="display-5"/>
            </MDBCard>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
    </MDBCol>
  )
}

export default StickyNotes
