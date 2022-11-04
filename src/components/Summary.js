import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import Sliders from '../assets/Sliders';
import Graph from './Graph';
import "./Summary.css"

const Summary = () => {
  const userEmail = localStorage.getItem("userEmail")
  const [exercisesStart, setExercisesStart] = useState([]);
  const [foodEatenStart, setFoodEatenStart] = useState([]);
  const [exercisesEnd, setExercisesEnd] = useState([]);
  const [foodEatenEnd, setFoodEatenEnd] = useState([]);

  const [dateStart, setDateStart] = useState(new Date());
	const [dateEnd, setDateEnd] = useState(new Date());
  useEffect(()=>{
    axios.get('http://localhost:5000/exercises/all-exercises/'+userEmail)
      .then(response => {
        setExercisesStart(response.data.map((e)=>e))
        setExercisesEnd(response.data.map((e)=>e))})
      .catch((error) => {
        console.log(error)})
    axios.get('http://localhost:5000/foodeaten/all-foodeaten/'+userEmail)
      .then(response => {
        setFoodEatenEnd(response.data.map((e)=>e))
        setFoodEatenStart(response.data.map((e)=>e))})
      .catch((error) => {
        console.log(error)})
      },[userEmail])
  const exeStart = exercisesStart.sort((a,b) => a.date.localeCompare(b.date));
  const feaStart = foodEatenStart.sort((a,b) => a.date.localeCompare(b.date));
  const exeEnd = exercisesEnd.sort((b,a) => a.date.localeCompare(b.date))
  const feaEnd = foodEatenEnd.sort((b,a) => a.date.localeCompare(b.date))

  const exeStartIndex = exeStart.map((e)=>e.date).findIndex((e)=>e.includes(dateStart.toISOString().substring(0,10)))
  const exeEndIndex = exeEnd.map((e)=>e.date).findIndex((e)=>e.includes(dateEnd.toISOString().substring(0,10)))
  const exerDisplay = exeStart.slice(exeStartIndex,exercisesStart.length-exeEndIndex)

  const feaStartIndex = feaStart.map((e)=>e.date).findIndex((e)=>e.includes(dateStart.toISOString().substring(0,10)))
  const feaEndIndex = feaEnd.map((e)=>e.date).findIndex((e)=>e.includes(dateEnd.toISOString().substring(0,10)))
  const feaDisplay = feaStart.slice(feaStartIndex,foodEatenStart.length-feaEndIndex)

  const exeCheck = exeStartIndex && exeEndIndex === -1 ? true : false
  const feaCheck = feaStartIndex && feaEndIndex === -1 ? true : false
  console.log(feaStartIndex) 
  // nag didisplay pa din yung deafult whahhahahha
  return localStorage.length > 1? (
    <>
  
  <h4>Select Date:</h4>
    <div>    From:<br/>
    <DatePicker
    selected={dateStart}
    onChange={(e)=> setDateStart(e)}
    maxDate={dateEnd}
  /><br/>
    To:<br/>
    <DatePicker
    selected={dateEnd}
    onChange={(e)=> setDateEnd(e)}
    minDate={dateStart}
    maxDate={new Date()}
  />
  </div>
 
  <Graph exerDisplay={exerDisplay} feaDisplay={feaDisplay}/>
{exeCheck ? 
("")
:(<table className="table">
  <thead className="thead-light">
    <tr>
      <th>Description  </th>
      <th>Calories Burned  </th>
      <th>Date </th>
    </tr>
  </thead>
  {exerDisplay.map((e)=>
  <tbody>
    <td>{e.description}</td>
    <td>{e.calories}</td>
    <td>{e.date.substring(0, 10)}</td>
  </tbody>)}
</table>)}
{feaCheck ?("")
:(
<table className="table">
  <thead className="thead-light">
    <tr>
      <th>Description  </th>
      <th>Calories Burned  </th>
      <th>Date </th>
    </tr>
  </thead>
  {feaDisplay.map((e)=>
  <tbody>
    <td>{e.description}</td>
    <td>{e.calories}</td>
    <td>{e.date.substring(0, 10)}</td>
  </tbody>)}
</table>)}
  </>
    ):(
      <>
      <h1>Welcome to Calorie Tracker!</h1>
      <p>Calorie Tracker is an app for people who are health conscious or wants to monitor their diet.</p>
      <p>This app helps you to balance your daily, weekly, or monthly calories.</p>
      <p>Start using Calorie app today!</p>
      <Sliders/>
      </>
      )
  }

export default Summary