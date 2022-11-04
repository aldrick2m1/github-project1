import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Summary.css"

const ExercisesList = (props) => {
  const [exercises, setExercises] = useState([]);
  const [description, setDescription] = useState(true);
  const [calories, setCalories] = useState(true);
  const [date, setDate] = useState(true);
  // get all the exercises logged by all users
  const userEmail = localStorage.getItem("userEmail")
  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/all-exercises/"+userEmail)
      .then((response) => {
      setExercises(response.data)})
      .catch((error) => {
        console.log(error);
      });
  }, [userEmail]);
// delete specific exercise logged by any user
  const deleteExercise = (id) => {
    axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
      console.log(response.data);
    });
    setExercises({
      exercises: exercises.filter((el) => el._id !== id),
    });
    window.location = '/all-exercises';
  };

  // const filterDates =()=> {
  //   exercises.filter((e)=>e.date.includes(dateFind.toISOString().substring(0,10)))
  //   console.log(exercises)
  //   };
    

const alphabet =()=>{
  description ? 
  exercises.sort((a,b) => a.description.localeCompare(b.description)):
  exercises.sort((b,a) => a.description.localeCompare(b.description))
}
const num =()=>{
  calories ? 
  exercises.sort((a,b) => a.calories-b.calories):
  exercises.sort((b,a) => a.calories-b.calories)
}
const calendar =()=>{
  date ? 
  exercises.sort((a,b) => a.date.localeCompare(b.date)):
  exercises.sort((b,a) => a.date.localeCompare(b.date))
}



  return(
    <div>
      <h3>Logged Exercises</h3>  
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Description <button className="btn-sort" onClick={()=>{
              alphabet()
              setDescription(!description)}}>⇅</button> </th>
            <th>Calories Burned  <button className="btn-sort" onClick={()=>{
              num()
              setCalories(!calories)}}>⇅</button></th>
            <th>Date <button className="btn-sort" onClick={()=>{
              calendar()
              setDate(!date)}}>⇅</button></th>
            <th>Actions</th>
          </tr>
        </thead>
        {exercises.map((currentexercise)=>
        <tbody>
          <td>{currentexercise.description}</td>
          <td>{currentexercise.calories}</td>
          <td>{currentexercise.date.substring(0, 10)}</td>
          <td>
          <Link to={"/edit-exercise/"+ currentexercise._id}>edit</Link> | <a href="#" onClick={ ()=> deleteExercise(currentexercise._id)}>delete</a>
          </td>
        </tbody>)}
      </table>
    </div>
  );
};

export default ExercisesList;
