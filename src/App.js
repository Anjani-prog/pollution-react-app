import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Graph from "./pages/Graph";
import NoPage from "./pages/NoPage";
import { MyContext } from "./context";

import "bootstrap/dist/css/bootstrap.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./App.css";

export default function App() {
  const [value, setValue] = useState(""); // Initial value for the context

  const updateValue = (newValue) => {
    setValue(newValue);
  };
  return (
    <MyContext.Provider value={{ value, updateValue }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="graph" element={<Graph />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}
