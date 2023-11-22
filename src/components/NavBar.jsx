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

//   Display logo and home link
//   If user is logged in
//     Show links to Dashboard and Community Section
//     Show logout button
//   Else
//     Show links to Login and Register




export default NavBar