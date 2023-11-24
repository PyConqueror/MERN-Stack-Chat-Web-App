import {Link} from "react-router-dom"

function LandingPage(){
    return(
        <>
        <h1>LANDING PAGE</h1>
        <Link to={"/login"}>Login</Link>
        </>
    )
}

export default LandingPage