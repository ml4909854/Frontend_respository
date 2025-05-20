import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
// import Navbar from "./Navbar/Navbar.jsx";
import Contact from "./Component/Contact";
import About from "./Component/About";
import Login from "./Component/Login.jsx";
import Nopage from "./Component/Nopage.jsx";
import Navbar from "./Navbar/Navbar.jsx";
const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
