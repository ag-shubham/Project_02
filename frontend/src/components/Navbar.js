import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {

  let navigate = useNavigate() ;
  const handleLogout = () => {
    localStorage.removeItem('token') ;
    navigate("/login") ;
  }

  const initUser =[]
  const [user, setUser] = useState(initUser);
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getUser() 
    }
  }, [])

  
  const getUser = async () => {
    // API
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyZjNhOTJiN2UxNTFiZjFjMDEwYjlkIn0sImlhdCI6MTY0NzI2MjM1NH0.a7Fi4W40nqfizOF70MzCKbMV8Fpnsn6fNbLKiDjvLsQ
    const json = await response.json();
    console.log(json);
    setUser(json);
  };
  



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Project02
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">

            {/* here i we have used Navlink instead of use location as it does the same job */}
              
              <NavLink className="nav-link active" aria-current="page" to="/"> 
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/allblogs">
                Blogs
              </NavLink>
            </li>
          </ul>
          {!localStorage.getItem('token') ? 
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form> : <div >Welcome {user.name}<button onClick={handleLogout} className="btn btn-primary">Logout</button></div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
