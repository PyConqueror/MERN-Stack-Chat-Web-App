import {Link} from "react-router-dom"
import * as userService from '../utilities/users-service';

function Navbar({user, setUser}) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }
    return (
        <aside>
            <Link to={"/"}>Chats Page</Link>
            &nbsp; | &nbsp;
            <Link to={"/community"}>Community Page</Link>
            &nbsp; | &nbsp;
            <Link to={"/friends"}>Friends Page</Link>
            &nbsp; | &nbsp;
            <Link to={"/profile"}>Profile Page</Link>
            &nbsp; | &nbsp;
            <span>Welcome, {user.name}</span>
            &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </aside>
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