import {Link} from "react-router-dom"
import * as userService from '../../src/utilities/users-service';

function NavBar({user, setUser}) {
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
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




export default NavBar