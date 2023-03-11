import {Routes, Route} from "react-router-dom";
import Homepage from './pages/homepage';
import Register from './pages/register';
import Login from './pages/login';
import Student from './pages/student';
import Loginpath from './pages/login';
// import Professors from "./pages/professors";
import Coordinator from "./pages/coordinator"
import Calendar from "./pages/calendar";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Loginpath />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<Student />} />
        {/* <Route path="/professor" element={<Professors />} /> */}
        <Route path="/calendar" element={<Calendar lightMode={false} />} />
        <Route path="/coordinator" element={<Coordinator />} />
      </Routes>
      
    </div>
  );
}

export default App;
