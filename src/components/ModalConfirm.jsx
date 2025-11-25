import React from 'react';
import ReactDOM from 'react-dom';

const ModalConfirm = ({ title, content, show, onClose, onConfirm, confirmText }) => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return null;


  if (show !== true) {
    return
  }
  return ReactDOM.createPortal(
    (
      <div className="modal-overlay">
        <div className="modal-box">
          <h1>{title}</h1>
          <p>{content}</p>
          <button onClick={onClose}>Anulla</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    ),
    modalRoot
  );
};

export default ModalConfirm;
