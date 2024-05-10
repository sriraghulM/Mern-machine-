import React, { useState } from "react";
import log from "./assets/log.svg";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { hashSync, compareSync } from "bcrypt-ts";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import "./register.css";



const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phoneNumber);
};
const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

      try {
      const response = await axios.get("http://localhost:8000/users");
      const usersData = response.data;

      const user = usersData.find((user) => user.email === email);

      if (!user) {
        setError("User does not exist. Please register.");
        return;
      }



      console.log("Login successful!");
      navigateTo("/admin-panel");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Sign In</h2>
            {error && <p className="error">{error}</p>}
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your Email"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
              
                type="password"
                placeholder="Password"
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Create Employee </p>
            <Link to="/Register">
              <button className="btn transparent" id="sign-up-btn">
                Create
              </button>
            </Link>
          </div>
          <img src={log} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};


const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isValidPhoneNumber(mobile)) {
      setError("Please enter a valid phone number (10 digits only).");
      return;
    }
    if (email.length > 50) {
      setError("Email address exceeds the maximum character limit (50).");
      return;
    }
    if (!name.trim() || !email.trim() || !mobile.trim() || !designation.trim() || !gender.trim() || courses.length === 0) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/users");
      const usersData = response.data;
      const existingUsers = usersData.find((user) => user.email === email);
      if (existingUsers) {
        setError("User already exists. Please login.");
        window.alert("User already exists. Please login.");
        navigateTo("/");
        return;
      }
      
      const userId = uuidv4();
      const user = {
        id: userId,
        name: name,
        email: email,
        mobile: mobile,
        designation: designation,
        gender: gender,
        courses: courses,
      };
      await axios.post("http://localhost:8000/users", user);
      navigateTo("/");
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Failed to register user. Please try again later.");
    }
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCourses((prevCourses) => [...prevCourses, value]);
    } else {
      setCourses((prevCourses) => prevCourses.filter((course) => course !== value));
    }
  };

  return (
    <div className="cont sign-up-mode ">
      <div className="formsContainer">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="signUpForm">
            <h2 className="title">Create Employee </h2>
            {error && <p className="error">{error}</p>}
            <div className="inputField">
            <label>Name:  </label>
              <i className="fas fa-user"></i>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder=""
              />
            </div>
            <div className="inputField">
            <label>Email:   </label>
              <i className="fas fa-user"></i>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder=""
              />
            </div>
            <div className="inputField">
            <label>Mobile No:  </label>
              <i className="fas fa-mobile-alt"></i>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="text"
                placeholder=""
              />
            </div>
            <div className="inputField">
            <label>Desgination : </label>
              <i className="fas fa-briefcase"></i>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="inputField">
              <label>Gender:  </label>
              <input
                type="radio"
                name="gender"
                value="M"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="F"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </div>
            <div className="inputField">
              <label>Courses:  </label>
              <input
                type="checkbox"
                value="MCA"
                onChange={handleCourseChange}
              />{" "}
              MCA
              <input
                type="checkbox"
                value="BCA"
                onChange={handleCourseChange}
              />{" "}
              BCA
              <input
                type="checkbox"
                value="BSC"
                onChange={handleCourseChange}
              />{" "}
              BSC
            </div>

            <input
              type="submit"
              className="btn solid"
              value="Update"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
const WelcomeAdminPanel = () => {
  return (
    <div>
      <h1>Welcome to Admin Panel</h1>
      <p>This is the Admin Panel where you can manage users, settings, etc.</p>
      {/* Add your admin panel content here */}
    </div>
  );
};

export { Login, Register, WelcomeAdminPanel };
