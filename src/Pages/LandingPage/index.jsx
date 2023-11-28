import {Link} from "react-router-dom"

function LandingPage(){
    return(
        <div className='content-container'>
        <h1>LANDING PAGE</h1>
        <Link to={"/login"}>Login</Link>
        </div>
    )
}

export default LandingPage