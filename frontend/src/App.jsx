import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PeoplesData from "./pages/PeoplesData";
import ProtectedRoute from './components/ProtectedRoute.jsx/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import Dashboard from './components/Dashboard/Dashboard';
import PersonDetail from './pages/PeopleDetail';

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to ="/login" replace />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/login" element={<Login />} />
                <Route path="/data" element={<ProtectedRoute roles={['volunteer', 'admin', 'super_admin']}><PeoplesData /></ProtectedRoute>} />
                <Route path="/data/:id" element={<ProtectedRoute roles={['volunteer', 'admin', 'super_admin']}><PersonDetail /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute roles={['admin', 'super_admin']}><Dashboard /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;