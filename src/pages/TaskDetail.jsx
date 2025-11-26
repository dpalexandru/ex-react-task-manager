import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import ModalConfirm from '../components/ModalConfirm';

const TaskDetail = () => {
  const { tasks, removeTask } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const task = tasks.find(t => t.id == id);

  // elimina task
  async function EliminaTask() {
    try {

      await removeTask(id);
      navigate("/");

    } catch (error) {
      console.error(error);

    }
  }

  function handleClickDelete() {
    setShowConfirm(true);
  }

  const CloseModale = () => {
    setShowConfirm(false)
  }


  // se non c'è il task
  if (!task) return <p>Task non trovato...</p>;

  return (
    <div className="container-dettaglio-task">

      {/* Modale di conferma con props*/}
      {showConfirm && (
        <ModalConfirm
          title="Sei sicuro di voler eliminare questo task?"
          content="Una volta eliminata la task non è possibile recuperarla in nessun modo. Premi conferma per elimare definitivamente questa task, altrimenti anulla."
          show={showConfirm}
          onClose={CloseModale}
          onConfirm={EliminaTask}
          confirmText="Conferma"

        />
      )}

      {task && (
        <>
          <h1>Dettaglio Task</h1>
          <p><strong>Nome:</strong> {task.title}</p>
          <p><strong>Stato:</strong> {task.status}</p>
          <p><strong>Descrizione:</strong> {task.description}</p>
          <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleString("it-IT")}</p>

          <button onClick={handleClickDelete}>
            Elimina Task
          </button>
        </>
      )}
    </div>
  );
};

export default TaskDetail;
