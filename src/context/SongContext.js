import React from 'react'

const SongContext = React.createContext({
  songDetails: {},
  updatedSongDetails: () => {},
})

export default SongContext
