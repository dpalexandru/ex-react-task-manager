import { useState, useEffect } from "react";
import React from 'react'

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
  function addTask(params) {

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