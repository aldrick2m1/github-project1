import React, { useState } from 'react'
import './App.css'
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import DoneTask from "./components/DoneTask";
import PendingTask from "./components/PendingTask";

function App() {
//set up useState for the changes in the data
  const [todos, setTodos] =useState([])

  // addTodo function screens the users input 
  // spaces only not valid
  // duplicate items not valid
  const addTodo = todo => {
    // map the data so that we can check every elemnt in the array
    const data = todos.map((e) => e.text)
    if(data.includes(todo.text)){
        alert("Task is already on the list")
        return;
  // /^\s*$/.test -- check for empty strings or only spaces
    }else if(!todo.text || /^\s*$/.test(todo.text)){
      alert("Task not valid")
      return;
    }
    const newTodos = [todo, ...todos]
    setTodos(newTodos)
}
// if the update has no changes, empty or spaces only. it returns to the original text
const updateTodo = (todoId, newValue) => {
  if(!newValue.text || /^\s*$/.test(newValue.text)){
      return;
  }
// if the update has changes find the same id and replace the item with new text if false no changes.
  setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
}
// filter the selected id and display items that are not similar to it.
const removeTodo = id => {
  const removeArr = [...todos].filter(todo => todo.id !== id)

  setTodos(removeArr)
}
// if the task is clicked as completed the isComplete will return TRUE if not FALSE, that we will use to change the display effect
const completeTodo = id => {
  let updatedTodos = todos.map(todo => {
      if(todo.id === id) {
        // acts as a TRUE to FALSE : FALSE to TRUE switch
          todo.isComplete = !todo.isComplete
      }
      return todo;
      
  })
  setTodos(updatedTodos);
  
}
  return(
<>
<div className='todo-app-input'>
<h1>What to do today?</h1>
<TodoForm onSubmit={addTodo}/>
</div>
<div className='todo-app'>
  <nav>
    <Link to=""><h5>All</h5></Link>|
    <Link to="done"><h5>Done Task</h5></Link>|
    <Link to="pending"><h5>Pending Task</h5></Link>
  </nav>
  <Routes>
  <Route path="" element={<Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>} />
  <Route path="/done" element={<DoneTask todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>} />
  <Route path="/pending" element={<PendingTask todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>} />
  </Routes>
</div>

</>
  )
}
export default App;