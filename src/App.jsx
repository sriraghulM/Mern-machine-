import React, { useState } from "react";
import {BrowserRouter , Routes, Route } from "react-router-dom";
import { Login, Register, WelcomeAdminPanel } from "./Loginpage.jsx";

function App() {
  const [userID, setUserID] = useState(null);
  const updateUser = (newUser) => {
    setUserID(newUser);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/admin-panel" element={<WelcomeAdminPanel />} />
        </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;



/*
import React, { useState } from 'react';
import Menu from './Menu2.jsx';
function App() {
  const [currentForm, setCurrentForm] = useState('Menu');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return(<div className="menuPage">
    <Menu onFormSwitch = {toggleForm}/>
  </div>
  );
};
export default App;
*/
