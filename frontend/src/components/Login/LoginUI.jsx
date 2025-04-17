import './LoginUI.css';

function Login() {
    
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