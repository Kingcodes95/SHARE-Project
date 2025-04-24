import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginUI.css';

function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        if (accessToken && refreshToken) {
            navigate("/data");
        }
    }, [navigate])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const res = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.detail || 'Login failed') 
            }

            // Store tokens
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            localStorage.setItem('user', JSON.stringify(data.user))

            // Redirect to data page
            navigate('/data')

        } catch (err) {
            setError(err.message)
        }

    }
    

    return(
        <>
            <form className="login-container" onSubmit={handleSubmit}>
                <div className='login-text'>
                    <h1>Login</h1>
                </div>
                <hr />
                <div className='username-div'>
                    <h3>Username:</h3>
                    <input type="text" placeholder='Enter Username' value={username} onChange={e => setUsername(e.target.value)} required/>
                </div>
                <div className="password-div">
                    <h3>Password:</h3>
                    <input type="password" placeholder='Enter Password' value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <div className="login-button-div">
                    <button type="submit">Login</button>
                </div>
                <div className="error">
                    {error && <p>{error}</p>}
                </div>
            </form>
        </>
    );
}

export default Login;