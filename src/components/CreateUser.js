import { useEffect, useState } from "react";
import axios from "axios";
import  { FaUserCircle }  from 'react-icons/fa';
const CreateUser =()=> {
 
  const userEmail = localStorage.getItem("userEmail")
  const [firstName, setFirstName] = useState("")
  const [users, setUsers] = useState([])
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signUp, setSignUp] = useState(true);
useEffect(() => {
  axios.get('http://localhost:5000/users/')
  .then(res => setUsers(res.data.map((e)=>e.email)));

}, [])

  const handleSubmit = async (e) => {
    localStorage.setItem("userEmail", email)
		e.preventDefault();
		try {
      const data = {
        email: email,
        password: password
      }

			const url = "http://localhost:5000/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
      console.log(error)
		}
	};
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.reload();
    window.location = '/login';
  };
  
    return localStorage.length > 1?(<>
    Logged in to {userEmail}, Do you wish to 
    <button disabled={localStorage.length < 1 ? true:false }  onClick={handleLogout}>Log out</button>?
    <div className="accounts">
    <FaUserCircle size={200}/>
    <h4>Name: Aldrick Mamaril</h4>
    <h4>Email: {userEmail}</h4>
    </div>
    </>): signUp === true?(
      <>
    <h3>Welcome!</h3>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
						<h1>Login to Your Account</h1>
            <label>Email:: </label>
						<input
            className="form-control"
							type="email"
							name="email"
              onChange={(e)=> setEmail(e.target.value)}
							value={email}
							required
						/>
              <label>Password: </label>
						<input
            className="form-control"
							type="password"
							name="password"
              onChange={(e)=> setPassword(e.target.value)}
							value={password}
							required
						/>
            </div>
            <div className="form-group">
						<input className="btn btn-primary" type="submit"/>
            <button className="btn btn-primary"  onClick={()=> setSignUp(!signUp)}>No account yet?</button>
            </div>
					</form>

      </>

    ):(
      <div>
        <h3>Create New User</h3>
        <form onSubmit = {(e)=>{

        e.preventDefault();
        const user = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }
        console.log(user);
        if(users.includes(email)){
          alert("email already exists")
        }else{
        axios.post('http://localhost:5000/users/add', user)
          .then(res => console.log(res.data));
          alert("User Created Successfully! It's time to Log your Calories!")
          setFirstName("")
          setLastName("")
          setEmail("")
          setPassword("")
        }}}>
          <div className="form-group"> 
            <label>First Name: </label>
            <input  type="text"
                required
                className="form-control"
                onChange={(e)=> setFirstName(e.target.value)}
                value={firstName}
                />
            <label>Last Name: </label>
            <input  type="text"
                required
                className="form-control"
                onChange={(e)=> setLastName(e.target.value)}
                value={lastName}
                />
            <label>Email: </label>
            <input  type="email"
                required
                className="form-control"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                />
            <label>Password: </label>
            <input  type="password"
                required
                className="form-control"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
            <button className="btn btn-primary" onClick={()=> setSignUp(!signUp)}>{signUp? "No account yet?":"Back to Log in"}</button>
          </div>
        </form>
      </div>
    )
  }

export default CreateUser