import React, { useState, useEffect } from 'react'
import Todo from './Todo';

const DoneTask = ({todos, completeTodo, removeTodo, updateTodo}) => {
  const [notice, setNotice] =useState('')
  const filterDoneTask = todos.filter((e)=> e.isComplete === true)
  useEffect(()=> {
    filterDoneTask.length === 0 ? setNotice('No Done Tasks') : setNotice('')
    },[filterDoneTask, removeTodo]);
  return (
    <div>
        <h1>Done Task</h1>
        <Todo todos={filterDoneTask} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
        <h3>{notice}</h3>
    </div>
  )
}

export default DoneTask