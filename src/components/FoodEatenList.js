import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

const FoodEatensList = (props) => {
  const [foodeaten, setFoodEatens] = useState([]);
  const [description, setDescription] = useState(true);
  const [calories, setCalories] = useState(true);
  const [date, setDate] = useState(true);
    // get all the food logged by all users
    const userEmail = localStorage.getItem("userEmail")
  useEffect(() => {
    axios
      .get("http://localhost:5000/foodeaten/all-foodeaten/"+userEmail)
      .then((response) => setFoodEatens(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [userEmail]);
// delete specific exercise logged by any user
  // const deleteFoodEaten = (id) => {
  //   axios.delete("http://localhost:5000/foodeaten/" + id).then((response) => {
  //     console.log(response.data);
  //   });
  //   setFoodEatens({
  //     foodeaten: foodeaten.filter((el) => el._id !== id),
  //   });
  //   window.location = '/all-foodeaten';
  // };

  const alphabet =()=>{
    description ? 
    foodeaten.sort((a,b) => a.description.localeCompare(b.description)):
    foodeaten.sort((b,a) => a.description.localeCompare(b.description))
  }
  const num =()=>{
    calories ? 
    foodeaten.sort((a,b) => a.calories-b.calories):
    foodeaten.sort((b,a) => a.calories-b.calories)
  }
  const calendar =()=>{
    date ? 
    foodeaten.sort((a,b) => a.date.localeCompare(b.date)):
    foodeaten.sort((b,a) => a.date.localeCompare(b.date))
  }
  

  return(
    <div>
      <h3>Logged Food Eaten</h3>
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
        {foodeaten.map((currentfoodeaten)=>
        <tbody>
          <td>{currentfoodeaten.description}</td>
          <td>{currentfoodeaten.calories}</td>
          <td>{currentfoodeaten.date.substring(0, 10)}</td>
          <td>

          {/* <Link to={"/edit-foodeaten/"+ currentfoodeaten._id}>edit</Link> | <a onClick={ ()=> deleteFoodEaten(currentfoodeaten._id)}>delete</a> */}
          </td>
        </tbody>)}
      </table>
    </div>
  );
};

export default FoodEatensList;
