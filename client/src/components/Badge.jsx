import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';

const Badge = ({ children, styleInfo }) => {
  const colorKey = {
    Personal: 'info',
    Work: 'success',
  };
  return (
    <h5 style={styleInfo}>
      <MDBBadge color={colorKey[children]}>
        <MDBIcon fas icon="tag" className="text-light me-2" />
        {children}
      </MDBBadge>
    </h5>
  );
};

Badge.propTypes = {
  children: PropTypes.element,
  styleInfo: PropTypes.any,
};

export default Badge;
