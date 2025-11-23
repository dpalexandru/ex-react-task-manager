import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // stati 
  const [tasks, setTasks] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`${API_URL}/tasks`);
        const data = await res.json();
        console.log(data);
        setTasks(data);
      } catch (err) {
        console.error("Errore nella chiamata al server:", err);
      }
    }
    fetchTasks();
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
}

// usare il contesto
export function useGlobalContext() {
  return useContext(GlobalContext);
}
