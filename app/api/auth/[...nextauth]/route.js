import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CognitoProvider({
            clientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
            clientSecret: null,
            issuer: process.env.COGNITO_ISSUER,
            client: {
                token_endpoint_auth_method: "none"
            }
        })
    ],
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }