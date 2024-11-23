import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import Banner from "./components/Banner";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      {/* <div>
        <Link to="/">Home</Link>
        <Link to="/page">Page</Link>
      </div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/page"
          element={
            <>
              <h1 className="text-center mt-3 mb-3">Page 1</h1>
              <Banner />
            </>
          }
        />
        {/* <Route path="/*" element={<NoPage />} /> */}
        {/* Future routes can be added here */}
      </Routes>
    </Router>
  );
};

export default App;