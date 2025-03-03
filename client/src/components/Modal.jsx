import PropTypes from 'prop-types';
import './Modal.css'; // Import your CSS file for styling
import { MDBIcon } from 'mdb-react-ui-kit';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn border rounded">
          <MDBIcon fas icon="times" />
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  show: PropTypes.any,
  onClose: PropTypes.any,
};

export default Modal;
