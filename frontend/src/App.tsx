import {Routes, Route } from "react-router-dom";
import  { Dashboard } from "./pages/Dashboard"
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
      <Routes>
        <Route 
        path="/login" 
        element={<Login />} />
        <Route
        path="/register"
        element={<Register />}
        />

        <Route element={<ProtectedRoute />}>
         <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        </Route>
      </Routes>
  )
}

export default App;