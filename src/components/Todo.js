import React, { useState } from 'react'
import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'

const Todo = ({todos, completeTodo, removeTodo, updateTodo}) => {
    // everytime we edit an item it updates the id and value
    const [edit, setEdit] = useState({
        id:'',
        value:'',
    })

    const submitUpdate = value => {
        updateTodo(edit.id,value)
        setEdit({
            id: '',
            value: '',
        });
    }
    // check if the id is Empty or not
    // the edit button will not work if the id is empty
    if(edit.id){
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }


 // map to the todo
  return todos.map((todo, index) => (
    <div 
    // display of todos
    // make use of ternary operator for the display effects
        className={todo.isComplete ? 'todo-row complete' : 'todo-row'} 
        key={index}>
            {/* to know what item was clicked */}
            {/* to change the STATUS */}
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
           {todo.text} 
        </div>
        {/* install react icons */}
        <div className='icons'>
            <RiCloseCircleLine
            onClick={()=> removeTodo(todo.id)}
            className='delete-icon'
            />
            <TiEdit
            onClick={()=> setEdit({id: todo.id, value: todo.text})}
            className='edit-icon'
            />
        </div>
    </div>
  ))
}

export default Todo;