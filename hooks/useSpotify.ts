import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string
})

export default function useSpotify () {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        console.log('error here <<<<>>>>')
        signIn()
      }
      // @ts-ignore
      spotifyApi.setAccessToken(session?.user?.accessToken)
    }
  }, [session])

  return spotifyApi
}
