import './LoginUI.css';

function Login() {
    
    return(
        <>
            <form className="login-container">
                <div className='login-text'>
                    <h1>Login</h1>
                </div>
                <hr />
                <div className='username-div'>
                    <h3>Username:</h3>
                    <input type="text" placeholder='Enter Username'/>
                </div>
                <div className="password-div">
                    <h3>Password:</h3>
                    <input type="password" placeholder='Enter Password'/>
                </div>
                <div className="login-button-div">
                    <button>Login</button>
                </div>
            </form>
        </>
    );
}

export default Login;