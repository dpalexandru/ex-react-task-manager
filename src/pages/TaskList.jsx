import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import TaskRow from '../components/TaskRow';


const TaskList = () => {
  const { tasks } = useGlobalContext()
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
            <TaskRow key={index} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;