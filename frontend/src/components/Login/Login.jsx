import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:8000/auth/login", {
                username,
                password
            });

            if (res.status === 200) {
                const { role } = res.data;

                // Redirect based on role
                if (role === "super_admin") {
                    navigate("/PeoplesData");
                } else {
                    navigate("/home");
                }
            }
        } catch (err) {
            setError(err.response?.data?.detail || "Login failed");
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-text">
                    <h1>Login</h1>
                </div>
                <hr />
                <form onSubmit={handleLogin}>
                    <div className="username-div">
                        <h3>Username:</h3>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password-div">
                        <h3>Password:</h3>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-button-div">
                        <button type="submit">Login</button>
                    </div>
                    {error && (
                        <div className="error-message">
                            <p style={{ color: "red" }}>{error}</p>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

export default Login;
