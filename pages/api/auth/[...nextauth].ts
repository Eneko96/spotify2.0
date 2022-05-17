import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'
import NextAuth from 'next-auth/next'
import SpotifyProvider from 'next-auth/providers/spotify'
import { JWT } from 'next-auth/jwt'

async function refreshAccessToken (token: JWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken as string)
    spotifyApi.setRefreshToken(token.refreshToken as string)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    console.log('Refreshed token:', refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: LOGIN_URL
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt ({ token, account, user }) {
      // Save the token in a cookie
      // This is optional, but makes it easier for the user
      // to login again in the future.
      //
      // This is also the same token that will be passed
      // to the `verifyJWT` middleware in `src/middleware/auth.ts`
      //
      // The `token` parameter is the JWT token that will be
      // passed to the `verifyJWT` middleware.
      //
      // The `account` parameter is the account object that
      // will be passed to the `verifyJWT` middleware.
      //
      // The `user` parameter is the user object that will
      // be passed to the `verifyJWT` middleware.
      //
      // You can use the `account` and `user` objects to
      // save the user's data to your database.
      //
      // You can also use the `token` object to save the
      // token to your database.
      //
      // You can use the `token` object to save the
      // token to your database.
      //
      // The `token` object has the following properties:
      //
      // - `token.userId`: The user ID
      // - `token.accessToken`: The access token
      // - `token.refreshToken`: The refresh token
      // - `token.tokenType`: The token type
      // - `token.expiresIn`: The number of seconds until the token expires
      // - `token.expiresAt`: The timestamp in seconds for when the token expires
      // - `token.scope`: The scope of the token
      // - `token.createdAt`: The timestamp in seconds for when the token was created
      // - `token.accountId`: The account ID
      // - `token.accountName`: The account name
      // - `token.accountType`: The account type
      // - `token.accountUsername`: The account username
      // - `token.accountDisplayName`: The account display name
      // - `token.accountProfileImageURL`: The account profile image URL
      // - `token.accountProfileURL`: The account profile URL

      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account && account.expires_at && account.expires_at * 1000
        }
      }

      // Return previous token if acc token not expired
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // acc token expiredm refresh token
      console.log('ACC TOKEN EXPIRED')
      return await refreshAccessToken(token)
    },

    async session ({ session, token }) {
      // ignore ts error
      // @ts-ignore
      session.user.accessToken = token.accessToken
      // ignore ts error
      // @ts-ignore
      session.user.refreshToken = token.refreshToken
      // ignore ts error
      // @ts-ignore
      session.user.username = token.username

      return session
    }
  }

})
