import React from 'react'
import { useContext } from 'react'
import { useGlobalContext } from '../context/GlobalContext'

const TaskList = () => {
  const { tasks } = useGlobalContext()
  console.log(tasks)

  return (
    <div>TaskList</div>
  )
}

export default TaskList