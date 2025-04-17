import './LoginUI.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.detail || "Login failed");
                setLoading(false);
                return;
            }

            localStorage.setItem("supabase_token", result.token);
            localStorage.setItem("refresh_token", result.refresh_token);
            localStorage.setItem("user", JSON.stringify(result.user));
      
            console.log("Login success, Loading..");
            navigate("/data");

        } catch (err) {
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            <form className="login-container" onSubmit={handleLogin}>
                <div className='login-text'>
                    <h1>Login</h1>
                </div>
                <hr />
                <div className='username-div'>
                    <h3>Username:</h3>
                    <input type="text" placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="password-div">
                    <h3>Password:</h3>
                    <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="login-button-div">
                    <button type='submit' disabled={loading} >Login</button>
                </div>
            </form>
        </>
    );
}

export default Login;