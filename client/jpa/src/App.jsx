import { Routes, Route } from "react-router-dom"
import { Register } from "./pages/Register";
import { JobListing } from "./pages/Listings";
import {Login} from "./pages/Login";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/listing" element={<JobListing/>}/>
      <Route path="/" element={<JobListing/>}/>
    </Routes>
  );
}

export default App;
