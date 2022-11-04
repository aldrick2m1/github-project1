import { v4 as uuidv4 } from "uuid";
import React, { useState} from 'react';

function TodoForm(props) {
  // make use of the ternary operator to have a different display from adding an item to updating an item
  // adding an item - props.edit is an empty string
  // updating an item - the string has text
  // will get from Todo.js
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
// in every form that is submitted these are the data that the array will get
// it will pass on to Todo.js
    props.onSubmit({
      id: uuidv4(),
      text: input,
      isComplete: false,
    });
    // its set to an empty string so every time submit is clicked, the textare is cleared
    setInput('');
  }; 
  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        // the display in updating an item
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        // the display in adding an item
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;