import React from 'react'

const SongContext = React.createContext({
  dummyDetails: 'Naveen',
  songDetails: {},
  updatedSongDetails: () => {},
})

export default SongContext
