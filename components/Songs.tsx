import { playlistState } from 'atoms/playlistAtoms'
import { useRecoilValue } from 'recoil'
import Song from './Song'

export default function Songs () {
  const playlist = useRecoilValue(playlistState)
  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-8">
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i}/>
      ))}
    </div>
  )
}
