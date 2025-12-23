// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import App from './App';

// // Auth pages
// import AuthPage from './auth/AuthPage.jsx';
// import Otp from './auth/OTP.jsx'; 
// import CreatePassword from "./auth/createpassword.jsx";
// import Success from "./auth/success.jsx";
// import ResetPassword from './auth/ResetPassword.jsx';
// // dashboard 

// // import Overview from './dashboard/overview.jsx';
// // import Courses from './dashboard/courses.jsx';
// // import Achievements from './dashboard/Achievements.jsx';
// // import Avatar from './dashboard/avatar.jsx';


// // Dashboard layout
// import Dashboard from "./dashboard/Dashboard.jsx";

// // Dashboard pages
// import Overview from './dashboard/overview.jsx';
// import Courses from './dashboard/courses.jsx';
// import Achievements from "./dashboard/Achievements.jsx";
// import Avatar from './dashboard/avatar.jsx'; 

// // General pages
// import Pricing from './pages/Pricing.jsx';
// import About from './pages/About.jsx';
// import Course from './pages/Course.jsx';
// import Contact from './pages/contact.jsx';

// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         {/* MAIN */}
//         <Route path="/" element={<App />} />

//         {/* AUTH FLOW */}
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="/auth/OTP" element={<Otp />} />
//         <Route path="/auth/CreatePassword" element={<CreatePassword />} />
//         <Route path="/auth/success" element={<Success />} />
//         <Route path="/auth/resetpassword" element={<ResetPassword  />}  />


        


//       {/* DASHBOARD MAIN LAYOUT */}
//       <Route path="/dashboard" element={<Dashboard />}>

//         {/* CHILD PAGES */}
//         <Route index element={<Overview />} />
//         <Route path="courses" element={<Courses />} />
//         <Route path="achievements" element={<Achievements />} />
//         <Route path="avatar" element={<Avatar />} />
//    </Route>


//         {/* PLACEHOLDER PAGES */}
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/course" element={<Course />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );




import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

/* 🌙 THEME CONTEXT */
import { ThemeProvider } from "./context/ThemeContext";

/* AUTH PAGES */
import AuthPage from "./auth/AuthPage.jsx";
import Otp from "./auth/OTP.jsx";
import CreatePassword from "./auth/createpassword.jsx";
import Success from "./auth/success.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";

/* DASHBOARD */
import Dashboard from "./dashboard/Dashboard.jsx";
import Overview from "./dashboard/overview.jsx";
import Courses from "./dashboard/courses.jsx";
import Achievements from "./dashboard/Achievements.jsx";
import Avatar from "./dashboard/avatar.jsx";

/* GENERAL PAGES */
import Pricing from "./pages/Pricing.jsx";
import About from "./pages/About.jsx";
import Course from "./pages/Course.jsx";
import Contact from "./pages/contact.jsx";

import "./index.css";

/* ============================
   🌙 APPLY THEME BEFORE REACT
   (prevents white flash)
=============================== */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          {/* MAIN */}
          <Route path="/" element={<App />} />

          {/* AUTH FLOW */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/OTP" element={<Otp />} />
          <Route path="/auth/CreatePassword" element={<CreatePassword />} />
          <Route path="/auth/success" element={<Success />} />
          <Route path="/auth/resetpassword" element={<ResetPassword />} />

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="courses" element={<Courses />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="avatar" element={<Avatar />} />
          </Route>

          {/* GENERAL PAGES */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/course" element={<Course />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
