import PropTypes from 'prop-types';
import './Modal.css'; // Import your CSS file for styling
import { MDBIcon } from 'mdb-react-ui-kit';

const ModalOne = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button
          onClick={onClose}
          className="modal-close-btn border bg-light bg-opacity-50 rounded"
        >
          <MDBIcon fas icon="times" />
        </button>
        {children}
      </div>
    </div>
  );
};

ModalOne.propTypes = {
  children: PropTypes.element,
  show: PropTypes.any,
  onClose: PropTypes.any,
};

export default ModalOne;
