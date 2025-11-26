import React from 'react';
import ReactDOM from 'react-dom';

const ModalConfirm = ({ title, content, show, onClose, onConfirm, confirmText }) => {


  if (show !== true) {
    return
  }
  return ReactDOM.createPortal(
    (
      <div className="modal-overlay">
        <div className="modal-box">
          <h1>{title}</h1>
          {content}
          <button onClick={onClose}>Anulla</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    ),
    document.body
  );
};

export default ModalConfirm;
