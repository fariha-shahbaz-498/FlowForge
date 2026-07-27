import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";


// Pages

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Team from "./pages/Team";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";



function App() {


return (

<Routes>


{/* Public Routes */}

<Route
path="/login"
element={<Login />}
/>


<Route
path="/register"
element={<Register />}
/>

<Route
  path="/team"
  element={
    <ProtectedRoute>
      <Team />
    </ProtectedRoute>
  }
/>

<Route
  path="/calendar"
  element={
    <ProtectedRoute>
      <Calendar />
    </ProtectedRoute>
  }
/>
<Route
path="/profile"
element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}
/>


{/* Protected Routes */}


<Route

path="/"

element={

<ProtectedRoute>

<Dashboard />

</ProtectedRoute>

}

/>



<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard />

</ProtectedRoute>

}

/>




<Route

path="/projects"

element={

<ProtectedRoute>

<Projects />

</ProtectedRoute>

}

/>



<Route

path="/tasks"

element={

<ProtectedRoute>

<Tasks />

</ProtectedRoute>

}

/>



<Route

path="/reports"

element={

<ProtectedRoute>

<Reports />

</ProtectedRoute>

}

/>




<Route

path="/settings"

element={

<ProtectedRoute>

<Settings />

</ProtectedRoute>

}

/>



<Route

path="/help"

element={

<ProtectedRoute>

<Help />

</ProtectedRoute>

}

/>





{/* Unknown Route */}

<Route

path="*"

element={

<ProtectedRoute>

<Dashboard />

</ProtectedRoute>

}

/>



</Routes>

);

}


export default App;