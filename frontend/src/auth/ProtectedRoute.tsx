import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth0();
    //its check if a user is authenticated or not, if not, it will redirect the user to home page, and if it is authenticated, then user can see theri profile page.
    return isAuthenticated ? (<Outlet/>): (<Navigate to="/" replace/>)
}

export default ProtectedRoute;