import {
  HeartIcon,
  HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon
} from '@heroicons/react/outline'
import { playlistIdState } from 'atoms/playlistAtoms'
import useSpotify from 'hooks/useSpotify'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function Sidebar () {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const spotifyApi = useSpotify()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => setPlaylists(data.body.items))
    }
  }, [session, spotifyApi])

  return (
    <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-auto h-screen max-w-xs'>
      <div className='space-y-4'>
        <button className='flex item-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5'/>
          <p>Home</p>
        </button>
        <button className='flex item-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5'/>
          <p>Search</p>
        </button>
        <button className='flex item-center space-x-2 hover:text-white'>
          <LibraryIcon className='h-5 w-5'/>
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
        <button className='flex item-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5'/>
          <p>Create Playlist</p>
        </button>
        <button className='flex item-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5'/>
          <p>Liked Songs</p>
        </button>
        <button className='flex item-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5'/>
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        {/* Playlists ... */}
        {playlists.map(playlist => (
          <p className='cursor-pointer hover:text-white' onClick={() => setPlaylistId(playlist.id)} key={playlist.id}>{playlist.name}</p>
        ))}
      </div>
    </div>

  )
}
