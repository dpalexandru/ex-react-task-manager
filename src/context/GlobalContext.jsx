import { createContext, useContext, useEffect, useState } from "react";
import useTasks from "../hooks/ useTasks";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // stati 
  const [tasks, addTask, removeTask, updateTask] = useTasks()


  return (
    <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </GlobalContext.Provider>
  );
}

// usare il contesto
export function useGlobalContext() {
  return useContext(GlobalContext);
}
