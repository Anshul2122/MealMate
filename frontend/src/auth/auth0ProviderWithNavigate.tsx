import { Auth0Provider} from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

const auth0ProviderWithNavigate = ({ children }: Props) => {
    
    // auth things here
    const domian = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
    const navigate = useNavigate();
    if (!domian || !clientId || !redirectUri || !redirectUri || !audience ) {
        throw new Error(`unable to initialize auth`);
    }

    //redirect to user to application page after auth successful
    const onRedirectCallback = () => {
        navigate("/auth-callback")
    }
    return (
        <Auth0Provider
            domain={domian}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience,
            }}
            onRedirectCallback={onRedirectCallback}
        >{ children} </Auth0Provider>
    );
}

export default auth0ProviderWithNavigate;