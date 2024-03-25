// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import ClassPage from './pages/class';
import StudentPage from './pages/student';
import StudentDetailPage from './pages/studentDetails';



function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <Router>
      <Routes>
      {!isLoggedIn ? (
        <Route path="/" exact element={<LoginPage />} />
        
      ) : (
          <>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/home" exact element={<HomePage />} />
        <Route path="/class" exact element={<ClassPage />} />
        <Route path="/student" exact element={<StudentPage />} />
        <Route path="/studentdetails" exact element={<StudentDetailPage />} />
        </>



      )}

        

        
        
      </Routes>
    </Router>
  );
}

// A custom route component to handle authentication
// function PrivateRoute({ component: Component, ...rest }) {
//   const isLoggedIn = !!localStorage.getItem('token');;
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isLoggedIn ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     ></Route>
//   );
// }

export default App;
