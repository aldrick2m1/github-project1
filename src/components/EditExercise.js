import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

 const EditExercise = (props) => {

    const userEmail = localStorage.getItem("userEmail")
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState(0);
    const [date, setDate] = useState(new Date());

  useEffect(()=>{
        // get the specific exercise log by ID to be editted
        console.log(props.match.params.id)
    axios.get('http://localhost:5000/exercises/'+ props.match.params.id)
      .then(response => {
        setDescription(response.data.description)
        setCalories(response.data.calories)
        setDate(new Date())})
      .catch((error) => {
        console.log(error)})
      },[props.match.params.id])
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={(e)=>{
      e.preventDefault();
      const exercise = {
        username: userEmail,
        description: description,
        calories: calories,
        date: date
      }
      // updates the food log by ID
      axios.put('http://localhost:5000/exercises/update-exercise/' +props.match.params.id, exercise)
      .then(res => console.log(res.data));
      window.location = '/all-exercises';
      }}>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              onChange={(e)=> setDescription(e.target.value.toLocaleLowerCase())}
              value={description}
              />
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
export default EditExercise