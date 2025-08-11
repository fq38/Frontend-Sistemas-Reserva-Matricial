import React from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<Props> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-secondary">Cancelar</button>
          <button onClick={onConfirm} className="btn btn-danger">Confirmar Exclusão</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;