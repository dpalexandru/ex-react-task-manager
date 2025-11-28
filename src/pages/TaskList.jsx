import React, { useMemo } from 'react'
import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext'
import TaskRow from '../components/TaskRow';


const TaskList = () => {
  const { tasks } = useGlobalContext()

  //stati per l'ordinamento 
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  console.log(searchQuery)

  //funzione ordinamento 
  const handlerSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev * -1)
    } else {
      setSortBy(field)
      setSortOrder(1)
    }
  }

  const sortIcon = sortOrder === 1 ? "↑" : "↓";


  // array task filtrato con use memo 
  const filteredAndSortedTasks = useMemo(() => {
    return [...tasks]
      .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        let comparison;
        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title)
        } else if (sortBy === "status") {
          const statusOptions = ["To do", "Doing", "Done"]
          comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status)
        } else if (sortBy === "createdAt") {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()
          comparison = dateA - dateB
        }
        return comparison * sortOrder
      })

  }, [tasks, sortBy, sortOrder, searchQuery]
  )


  return (
    <div>
      <h1 className="titolo">Elenco dei Task</h1>
      <span>Cerca per nome task</span>
      <input type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <table className="task-table">
        <thead>
          <tr>
            <th
              onClick={() => handlerSort("title")}
            >Nome
              {sortBy === "title" ? sortIcon : ""}
            </th>
            <th
              onClick={() => handlerSort("status")}

            >Stato
              {sortBy === "status" ? sortIcon : ""}
            </th>
            <th
              onClick={() => handlerSort("createdAt")}

            >Data di Creazione
              {sortBy === "createdAt" ? sortIcon : ""}
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredAndSortedTasks.map((task, index) => (
            <TaskRow key={index} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;