import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
// import files to be use
import Navbar from "./components/Navbar"
import ExercisesList from "./components/ExercisesList";
import CreateUser from './components/CreateUser';
import CreateExercise from './components/CreateExercises';
import EditExercise from './components/EditExercise';
import CreateFoodEaten from './components/CreateFoodEaten';
import FoodEatenList from './components/FoodEatenList';
import EditFoodEaten from './components/EditFoodEaten';
import Summary from './components/Summary';
import Footer from './components/Footer';

function App() {
  // const user = localStorage.getItem("token");

  return(
    //  react router does it helps map specifi url paths 2 different components to load in a page
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={Summary} />
      <Route path="/all-exercises" exact component={ExercisesList} />
      <Route path="/all-foodeaten" exact component={FoodEatenList} />
      <Route path="/edit-exercise/:id" component={EditExercise}/>
      <Route path="/edit-foodeaten/:id" component={EditFoodEaten}/>
      <Route path="/create-exercise" component={CreateExercise} />
      <Route path="/create-foodeaten" component={CreateFoodEaten} />
      <Route path="/login" component={CreateUser} />
      <Footer/>
      </div>
    </Router>
  )
}

export default App;
