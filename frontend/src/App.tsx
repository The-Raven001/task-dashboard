import {Routes, Route } from "react-router-dom";
import  { Dashboard } from "./pages/Dashboard"
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Landing } from "./pages/Landing";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="bottom-right" />
      <Routes>

        {/* Public routes */}
        <Route element={<PublicLayout />}> 

          
          <Route 
          path="/login" 
          element={<Login />} />
          <Route
          path="/register"
          element={<Register />}
          />
          <Route
          path="/landing"
          element={<Landing />}/>
        </Route>
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>

         <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        </Route>

      </Routes>
      </>
  )
}

export default App;