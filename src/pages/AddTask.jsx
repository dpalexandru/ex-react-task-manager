import React, { useState, useRef } from 'react'

const AddTask = () => {
  //stati e ref
  const [nomeTask, setNomeTask] = useState("")
  const textareaRef = useRef();
  const statusRef = useRef();


  function stampaForm(e) {
    e.preventDefault();
    console.log(nomeTask, textareaRef.current.value, statusRef.current.value)
  }


  return (
    <div className='container-form'>
      <form action="" onSubmit={stampaForm}>

        <input type="text"
          placeholder='Neme della task'
          value={nomeTask}
          onChange={(e) => setNomeTask(e.target.value)}
        />


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