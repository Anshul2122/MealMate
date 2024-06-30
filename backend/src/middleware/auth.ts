import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
    //this fucntion checks the authorization header for the bearer token
    // and check for the token for the logged in user
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});