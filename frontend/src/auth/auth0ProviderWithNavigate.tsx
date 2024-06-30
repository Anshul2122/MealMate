import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

const auth0ProviderWithNavigate = ({ children }: Props) => {
    
    // auth things here
    const domian = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const navigate = useNavigate();
    if (!domian || !clientId || !redirectUri || !redirectUri) {
        throw new Error(`unable to initialize auth`);
    }

    //redirect to user to app after auth successful
    const onRedirectCallback = (appState?: AppState, user?: User) => {
        navigate("/auth-callvback")
    }
    return (
        <Auth0Provider
            domain={domian}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
        >{ children} </Auth0Provider>
    );
}

export default auth0ProviderWithNavigate;