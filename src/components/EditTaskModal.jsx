import React from 'react'
import ReactDOM from 'react-dom';
import { useState, useRef } from 'react';
import ModalConfirm from './ModalConfirm';
import { Form } from 'react-router-dom';


const EditTaskModal = ({ show, onClose, task, onSave }) => {
  //stato task che stiamo modificando
  const [editedTask, setEditedTask] = useState(task)
  const editedFormRef = useRef()

  //funzione che modifica la task
  const changeEditidetTask = (key, event) => {
    setEditedTask(prev => ({ ...prev, [key]: event.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask)


  }


  return (
    <ModalConfirm
      title="Modifica task"
      content={
        <form ref={editedFormRef} onSubmit={handleSubmit}>
          <label htmlFor="">Nome Task:</label>
          <input type="text"
            value={editedTask.title}
            onChange={e => changeEditidetTask('title', e)}
          />

          <label>Decrizione:</label>
          <textarea
            value={editedTask.description}
            onChange={e => changeEditidetTask('description', e)}

          >
          </textarea>
          <label htmlFor="">Sato:</label>
          <select
            value={editedTask.status}
            onChange={e => changeEditidetTask('status', e)}
          >
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>

        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => editedFormRef.current.requestSubmit()}


    />

  )
}
export default EditTaskModal