import React, { useMemo, useCallback } from 'react'
import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext'
import TaskRow from '../components/TaskRow';
import { debounce } from "lodash";



const TaskList = () => {
  const { tasks } = useGlobalContext()

  //stati  
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTaskIds, setSelectedTaskIds] = useState([])



  const toggleSelection = (taskId) => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds(prev => prev.filter(id => id !== taskId));
    } else {
      setSelectedTaskIds(prev => [...prev, taskId])
    }
  }
  //ricerca ottimizzata 
  const debounceSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    []
  );


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

  console.log(selectedTaskIds)

  return (
    <div>
      <h1 className="titolo">Elenco dei Task</h1>
      <span>Cerca per nome task</span>
      <input type="text"
        onChange={e => debounceSearch(e.target.value)}
      />

      <table className="task-table">
        <thead>
          <tr>
            <th>Selziona</th>
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
            <TaskRow
              key={index}
              task={task}
              checked={selectedTaskIds.includes(task.id)}

              onToggle={toggleSelection}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;