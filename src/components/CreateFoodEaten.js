import React, { useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateFoodEaten =()=> {

  const userEmail = localStorage.getItem("userEmail")
  const [foodCal, setFoodCal] =useState(0)
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [calories, setCalories] = useState(0);
  const [date, setDate] = useState(new Date());
  useEffect(()=>{
    if(description.length > 0){
      axios.get(`http://localhost:5000/foodeaten-calories/${description}`)
        .then(response => {
          setUnit(response.data[0].unit)
          setFoodCal(response.data[0].calorie)})
        .catch((error) => {
          setFoodCal(0)
          console.log(error)})
}},[description])

// get all the users username to display in select options
console.log(description.length)
    return (
    <div>
      <h3>Create New Food Log</h3>
      <form onSubmit={(e)=> {
      e.preventDefault()
        const foodeaten = {
        username: userEmail,
        description: description,
        calories: calories,
        date: date
      }
      axios.post('http://localhost:5000/foodeaten/add-foodeaten', foodeaten).then(res => console.log(res.data));
      window.location = '/all-foodeaten';

      }}>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              onChange={(e)=> setDescription(e.target.value.toLocaleLowerCase())}
              value={description}
              placeholder="(example: bread, egg, rice)"
              />
            {foodCal > 0 ? `Estimated Calorie Content: ${foodCal} cal${unit}` : ""}
        </div>
        <div className="form-group">
          <label>Gained Calories (in calorie): </label>
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
          <input type="submit" value="Create Food Log" className="btn btn-primary"/>
        </div>
      </form>
    </div>
    )
  }

export default CreateFoodEaten