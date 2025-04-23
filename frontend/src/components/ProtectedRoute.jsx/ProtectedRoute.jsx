import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ children, roles }) {
    const token = localStorage.getItem('access_token');
    const raw_user_value = localStorage.getItem('user')
    const location = useLocation()

    const user = raw_user_value ? JSON.parse(raw_user_value): {};
    const userRole = user.role

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles && (!userRole || !roles.includes(userRole))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children
}

export default ProtectedRoute