import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Home } from "./Home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mobiles"
          element={
            <ProtectedRoute>
              <PhoneList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("token");
  console.log(isAuth);
  return isAuth ? children : <Navigate replace to="/" />;
}

function PhoneList() {
  const [mobiles, setMobiles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/mobiles", {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((mbs) => setMobiles(mbs));
  }, []);

  return (
    <div className="phone-list-container">
      {mobiles.map((mb, index) => (
        <Phone key={index} mobile={mb} />
      ))}
    </div>
  );
}

function Phone({ mobile }) {
  return (
    <div className="phone-container">
      <img src={mobile.img} alt={mobile.model} className="phone-picture"></img>
      <h2 className="phone-name">{mobile.model}</h2>
      <p className="phone-company">{mobile.company}</p>
    </div>
  );
}

export default App;
