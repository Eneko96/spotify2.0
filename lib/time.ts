// @ts-nocheck
export function millisToMinutesAndSeconds (milis: number) {
  const minutes = Math.floor(milis / 60000)
  const seconds = ((milis % 60000) / 1000).toFixed(0)
  // eslint-disable-next-line eqeqeq
  return seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
