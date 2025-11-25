import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks } = useGlobalContext()
  const task = tasks.find(t => t.id == id);

  //funzione elimina task
  function EliminaTask() {
    console.log(task)
  }

  if (!task) return <p>Task non trovato...</p>;

  return (
    <div className='container-dettaglio-task'>
      <h1>Dettaglio Task</h1>
      <p><strong>Nome:</strong> {task.title}</p>
      <p><strong>Stato:</strong> {task.status}</p>
      <p><strong>Descrizione:</strong> {task.description}</p>
      <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleString("it-IT")}</p>
      <button onClick={EliminaTask} >Elimina Task</button>
    </div>
  )
}

export default TaskDetail;
