import { useState } from 'react';
import Modal from './Modal';

const NewTask = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>My React App</h1>
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal show={showModal} onClose={handleCloseModal}>
        <h2>Popup Content</h2>
        <p>This is a simple modal popup in React.</p>
      </Modal>
    </div>
  );
};

export default NewTask;

