import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/dataSlice';
import PropTypes from 'prop-types';

const DataList = ({ onEditTask }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.items);
  const status = useSelector((state) => state.data.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Date:</strong> {item.date}</p>
          <button onClick={() => onEditTask(item)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

DataList.propTypes = {
    onEditTask: PropTypes.any
  };

export default DataList;
