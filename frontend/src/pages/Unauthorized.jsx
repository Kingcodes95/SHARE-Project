import { useNavigate } from "react-router-dom";

function Unauthorized() {

    const navigate = useNavigate()

    return(
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>403 - Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <button onClick={() => navigate('/data')}>Go Back</button>
        </div>
    )
}

export default Unauthorized;