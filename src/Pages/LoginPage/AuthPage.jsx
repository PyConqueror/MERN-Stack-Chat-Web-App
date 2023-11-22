import SignUpForm from "../../Components/SignUpForm"
import LoginForm from "../../Components/LoginForm"

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