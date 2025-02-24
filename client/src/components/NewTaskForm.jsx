import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../redux/dataSlice';
import PropTypes from 'prop-types';

const NewTaskForm = ({ currentTask, setCurrentTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setCategory(currentTask.category);
      setDate(currentTask.date);
    } else {
      setTitle('');
      setDescription('');
      setCategory('');
      setDate('');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, category, date };
    if (currentTask) {
      dispatch(updateTask({ ...currentTask, ...task }));
      setCurrentTask(null); // Reset current task after updating
    } else {
      dispatch(createTask(task));
    }
    setTitle('');
    setDescription('');
    setCategory('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      ></textarea>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

NewTaskForm.propTypes = {
    currentTask: PropTypes.any,
    setCurrentTask: PropTypes.any
  };

export default NewTaskForm;

