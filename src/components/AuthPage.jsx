import SignUpForm from "./SignUpForm"

function AuthPage({ setUser }) {
    return (
        <>
        <h1>AuthPage</h1>
        <SignUpForm setUser={setUser}/>
        </>
    )
}

export default AuthPage