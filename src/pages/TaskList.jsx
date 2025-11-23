import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'

const TaskList = () => {
  const { tasks } = useGlobalContext()
  console.log(tasks)

  return (
    <div>
      <h1 className="titolo">Elenco dei Task</h1>

      <table className="task-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{new Date(task.createdAt).toLocaleString("it-IT")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;