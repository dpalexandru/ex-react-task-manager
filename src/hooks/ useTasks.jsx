import { useState, useEffect } from "react";
import React from 'react'
import TaskRow from "../components/TaskRow";

const API_URL = import.meta.env.VITE_API_URL;


const useTasks = () => {
  //stati
  const [tasks, setTasks] = useState([]);

  //recupero lista tasks
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`${API_URL}/tasks`);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Errore nella chiamata al server:", err);
      }
    }
    fetchTasks();
  }, []);


  //aggiungi task
  async function addTask(obj) {

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const { success, message, task } = await response.json();
      if (!success) {
        throw new Error(message)
      }
      setTasks(prev => [...prev, task])

    } catch (error) {
      throw new Error(error)
    }
  }

  //rimuovi task
  function removeTask(params) {

  }
  //aggiorna task task
  function updateTask(params) {

  }



  return [tasks, addTask, removeTask, updateTask]
}

export default useTasks