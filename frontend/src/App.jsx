import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PeoplesData from "./pages/PeoplesData";

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to ="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/data" element={<PeoplesData />} />
            </Routes>
        </Router>
    );
}

export default App;