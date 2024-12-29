


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";
// import Dashboard from "./components/Dashboard";
// import PrivateRoute from "./components/Auth/PrivateRoute";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { Routes, Route, HashRouter } from "react-router-dom";

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/login" />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route
    //       path="/dashboard"
    //       element={
    //         <PrivateRoute>
    //           <Dashboard />
    //         </PrivateRoute>
    //       }
    //     />
    //   </Routes>
    // </Router>


    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contests/create" element={<CreateContest />} />
        <Route exact path="/contests/join" element={<JoinContest />} />
        <Route path="/contests/live" element={<LiveContest />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;
