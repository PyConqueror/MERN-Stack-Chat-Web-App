import {Link} from "react-router-dom"
import * as userService from '../utilities/users-service';

function NavBar({user, setUser}) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }
    return (
        <nav>
            <Link to={"orders/history"}>Order History</Link>
            &nbsp; | &nbsp;
            <Link to={"orders/new"}>New Order</Link>
            &nbsp; | &nbsp;
            <span>Welcome, {user.name}</span>
            &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
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




export default NavBar