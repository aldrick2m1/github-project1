import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise =()=> {
  const userEmail = localStorage.getItem("userEmail")
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState(0);
  const [date, setDate] = useState(new Date());
  const [unit, setUnit] = useState('');
  const [exerciseCal, setExerciseCal] =useState(0)
// get all the users username to display in select options
useEffect(()=>{
  if(description.length > 0){
    axios.get(`http://localhost:5000/exercise-calories/${description}`)
      .then(response => {
        setUnit(response.data[0].unit)
        setExerciseCal(response.data[0].calorie)})
      .catch((error) => {
        setExerciseCal(0)
        console.log(error)})
}},[description])
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={(e)=> {
      e.preventDefault()
        const exercise = {
        username: userEmail,
        description: description,
        calories: calories,
        date: date
      }
      axios.post('http://localhost:5000/exercises/add-exercise', exercise).then(res => console.log(res.data));
      window.location = '/all-exercises';

      }}>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              onChange={(e)=> setDescription(e.target.value.toLowerCase())}
              value={description}
              placeholder="(example: run, walk, jump)"
              />
              {exerciseCal > 0 ? `Estimated Calorie Content: ${exerciseCal} cal${unit}` : ""}
        </div>
        <div className="form-group">
          <label>Burned Calories (in calorie): </label>
          <input 
              type="text" 
              className="form-control"
              onChange={(e)=> setCalories(e.target.value)}
              value={calories}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={(e)=> setDate(e)}
              maxDate={new Date()}
           
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
        </div>
      </form>
    </div>
    )
  }

export default CreateExercise