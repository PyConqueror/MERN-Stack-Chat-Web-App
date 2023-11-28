import { NavLink, Link } from "react-router-dom"
import * as userService from '../utilities/users-service';

function Navbar({user, setUser}) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }
    return (
        <nav>
            <div className="nav-section">
                <p>Welcome, <br/>{user.name}!</p>
            </div>
            <div className="nav-section page-links">
                <NavLink to={"/profile"}>Profile</NavLink>
                <NavLink to={"/"} >Chats</NavLink>
                <NavLink to={"/community"}>Community</NavLink>
                <NavLink to={"/friends"}>Friends</NavLink>
            </div>  
            <div className="nav-section">
                <Link  onClick={handleLogOut}>&larr; Log Out</Link>
            </div>
        </nav>
    )
}

// Display logged-in user's name
//   Include Logout and Profile buttons or links
//   Section for Conversations List
//     Include a 'New Chat' button
//     List each conversation with User Name and Latest Message
//     Allow searching or filtering conversations
//   Include a 'Community' button or link at the bottom to navigate to the community section



export default Navbar