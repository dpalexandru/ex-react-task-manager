import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import Modal from '../components/Modal';

const TaskDetail = () => {
  const { tasks, removeTask } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const task = tasks.find(t => t.id == id);

  // elimina task
  async function EliminaTask() {
    try {
      setMessage("Task eliminato con successo");
      setShowModal(true);

      await removeTask(id);

    } catch (error) {
      console.error(error);
      setMessage("Errore durante l'eliminazione");
      setShowModal(true);
    }
  }

  function handleCloseModal() {
    navigate("/");
  }

  // se non c'è il task
  if (!task && !showModal) return <p>Task non trovato...</p>;

  return (
    <div className="container-dettaglio-task">
      {showModal && (
        <Modal message={message} onClose={handleCloseModal} />
      )}

      {task && (
        <>
          <h1>Dettaglio Task</h1>
          <p><strong>Nome:</strong> {task.title}</p>
          <p><strong>Stato:</strong> {task.status}</p>
          <p><strong>Descrizione:</strong> {task.description}</p>
          <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleString("it-IT")}</p>

          <button onClick={EliminaTask}>Elimina Task</button>
        </>
      )}
    </div>
  );
};

export default TaskDetail;
