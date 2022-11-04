import React, { useState, useEffect } from 'react'
import Todo from './Todo'


const PendingTask = ({todos, completeTodo, removeTodo, updateTodo}) => {
  const [notice, setNotice] =useState('')
  const filterPendingTask = todos.filter((e)=> e.isComplete === false)
  useEffect(()=> {
    filterPendingTask.length === 0 ? setNotice('No Pending Tasks') : setNotice('')
    },[filterPendingTask, removeTodo]);
  return (
    <div>
        <h1>Pending Task</h1>
        <Todo todos={filterPendingTask} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
        <h3>{notice}</h3>
    </div>
  )
}

export default PendingTask