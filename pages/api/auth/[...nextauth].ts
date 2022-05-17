import NextAuth from 'next-auth/next'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_AUTH_SPOTIFY_CLIENT_SECRET
    })
  ]
})
