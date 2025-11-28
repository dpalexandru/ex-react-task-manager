import { useState, useEffect } from "react";
import React from 'react'
import TaskRow from "../components/TaskRow";
import { forEach } from "lodash";

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
  async function removeTask(id) {

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
      });

      const { success, message } = await response.json();
      if (success === false) {
        throw new Error(message)
      }

      setTasks(prev => prev.filter(task => task.id !== Number(id)));

    } catch (error) {
      throw new Error(error)
    }

  }
  //aggiorna task task
  async function updateTask(updatedTask) {
    try {
      const res = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const { success, message } = await res.json();
      if (success === false) {
        throw new Error(message)
      }

      // aggiorno lo stato locale
      setTasks(prev =>
        prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
      );

    } catch (err) {
      console.error("Errore PUT:", err);
    }
  }

  // rimozione multiple
  async function removeMultipleTasks(taskIds) {
    const deleteRequests = taskIds.map((taskId) => (
      fetch(`${API_URL}/tasks/${taskId}`,
        { method: "DELETE" }
      ).then(res => res.json())
    ))
    const results = await Promise.allSettled(deleteRequests)
    const fullfieldDelitions = []
    const rejctedDelitions = []

    results.forEach((result, index) => {
      const taskId = taskIds[index]
      if (result.status === "fulfilled") {
        fullfieldDelitions.push(taskId)
      } else {
        rejctedDelitions.push(taskId)
      }
    })

    if (fullfieldDelitions.length > 0) {
      setTasks(prev => prev.filter(t => !fullfieldDelitions.includes(t.id)))
    }

  }



  return [tasks, addTask, removeTask, updateTask, removeMultipleTasks]
}

export default useTasks