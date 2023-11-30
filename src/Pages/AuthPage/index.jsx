import SignUpForm from "../../components/Auth/SignUpForm"
import LoginForm from "../../components/Auth/LoginForm"

function AuthPage({ setUser }) {
    return (
        <div className="landing-container">
            <div className="auth-form">
                <h2>Welcome, <br/>login to your account</h2>
                <LoginForm setUser={setUser}/>
                <p>New member? Sign up below</p>
                <SignUpForm setUser={setUser}/>
            </div>
            <div>
                <img src="/logo_white.svg" className="logo-landing"  />
                <img className="landing-image" src="/landing-image.jpg" alt="landing-image" />
            </div>
        </div>

    )
}

export default AuthPage