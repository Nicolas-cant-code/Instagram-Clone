import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home.jsx";
import Sidebar from "./components/Layout/Sidebar.jsx";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
