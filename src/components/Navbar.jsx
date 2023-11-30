import { NavLink, Link } from "react-router-dom"
import * as userService from '../utilities/users-service';
import { useNavigate, Navigate } from "react-router-dom";

function Navbar({user, setUser}) {
    const navigate = useNavigate();

    function handleLogOut() {
        navigate('/')
        userService.logOut();
        setUser(null);
    }
    
    return (
        <nav>
            <div className="nav-section">
                <h2>Welcome, <br/>{user.name} 👋</h2>
                <div className={user.avatar.startsWith('hsl') ? "profile-image" : "profile-image-large"}
                    style={user.avatar.startsWith('hsl') 
                    ? { backgroundColor: user.avatar } : { backgroundImage: `url(${user.avatar})`}}>
                    <p>{ user.avatar.startsWith('hsl') ? user.name.charAt(0) : ""}</p>
                </div>
            </div>
            <div className="nav-section page-links">
                <NavLink to={"/profile"}><img src="/profile.svg"/><p>Profile</p></NavLink>
                <NavLink to={"/"}><img src="../"/><p>Chats</p></NavLink>
                <NavLink to={"/communities"}><img src="src/assets/communities.svg"/><p>Communities</p></NavLink>
                <NavLink to={"/friends"}><img src="src/assets/friends.svg"/><p>Friends</p></NavLink>
            </div>  
            <div className="nav-section">
                <Link  onClick={handleLogOut}><img src="src/assets/logout.svg"/><p>Log out</p></Link>
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