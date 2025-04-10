import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Home from "./pages/Home";
import PeoplesData from "./pages/PeoplesData";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/PeoplesData" element={<PeoplesData />} />
      </Routes>
    </Router>
  );
}

export default App;
