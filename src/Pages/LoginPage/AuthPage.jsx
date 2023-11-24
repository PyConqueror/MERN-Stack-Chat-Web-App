import SignUpForm from "../../components/Auth/SignUpForm"
import LoginForm from "../../components/Auth/LoginForm"

function AuthPage({ setUser }) {
    return (
        <>
        <h1>AuthPage</h1>
        <SignUpForm setUser={setUser}/>
        <LoginForm setUser={setUser}/>
        </>
    )
}

export default AuthPage