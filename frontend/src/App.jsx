import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

// Lazy load
const Dashboard = lazy(() => import("./pages/Dashboard"));
const TeacherDetails = lazy(() => import("./pages/TeacherDetails"));

function App() {
  return (
    <Router>
      <div className="app-container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teacher/:id" element={<TeacherDetails />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
