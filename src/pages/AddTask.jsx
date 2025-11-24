import React, { useState, useRef, useMemo } from 'react'
import Modal from '../components/Modal';
import { useGlobalContext } from '../context/GlobalContext'
import TaskRow from '../components/TaskRow';


const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~\"";


const AddTask = () => {
  //stati e ref
  const [nomeTask, setNomeTask] = useState("")
  const [errore, setErrore] = useState("");
  const textareaRef = useRef();
  const statusRef = useRef();
  const { addTask } = useGlobalContext()



  async function stampaForm(e) {
    e.preventDefault();
    // controllo su nometask
    if (!nomeTask) {
      setErrore("Inserisci un nome!");
      return;
    }
    if (isNomeTaskValid) {
      setErrore("Il nome della task non deve contenere carattere speciali");
      return;
    }

    const newTask = {
      title: nomeTask.trim(),
      description: textareaRef.current.value,
      status: statusRef.current.value
    }

    try {
      await addTask(newTask)
      setNomeTask("")
      textareaRef.current.value = ""
      setErrore("Task registrata con successo")

    } catch (error) {
      setErrore("Erore chiamata server")
      throw new Error(error)
    }
  }

  // controllo in tempo reale sul nome ( non deve contenere carateri)
  const isNomeTaskValid = useMemo(() => {
    const isValid = [...symbols].some(sym => nomeTask.includes(sym))
    return isValid

  }, [nomeTask])

  return (
    <div className='container-form'>
      <form action="" onSubmit={stampaForm}>
        <Modal message={errore} onClose={() => setErrore("")} />


        <input type="text"
          placeholder='Neme della task'
          value={nomeTask}
          onChange={(e) => setNomeTask(e.target.value)}
        />
        {isNomeTaskValid && (
          <p className="errore">
            Il nome delal task non deve contenere caratteri speciali
          </p>
        )}


        <textarea name="description"
          placeholder='Inserisci una descrizione '
          ref={textareaRef}
        ></textarea>


        <select name="status" ref={statusRef}>
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>

        </select>

        <button type='submit'>Registra Task</button>

      </form>


    </div>
  )
}

export default AddTask