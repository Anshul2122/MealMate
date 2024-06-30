import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCllbackpage = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { createUser } = useCreateMyUser();
    //to make run create User function only once
    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            //whenever user sign in its creates a user in database
            createUser({ auth0Id: user.sub, email: user.email });
            hasCreatedUser.current = true;
        }
        navigate('/');
    }, [createUser, navigate, user]);
    return (
        <>Loading...</>
    );
}

export default AuthCllbackpage;