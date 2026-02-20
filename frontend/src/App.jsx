import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import TeacherDetails from "./pages/TeacherDetails";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teacher/:id" element={<TeacherDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
