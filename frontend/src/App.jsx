import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PeoplesData from "./pages/PeoplesData";
import ProtectedRoute from './components/ProtectedRoute.jsx/ProtectedRoute';

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to ="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/data" element={<ProtectedRoute><PeoplesData /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;