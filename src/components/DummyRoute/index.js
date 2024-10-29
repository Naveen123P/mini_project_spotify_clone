import {Component, createRef} from 'react'
import './index.css'

class DummyRoute extends Component {
  constructor(props) {
    super(props)
    this.audioRef = createRef()

    // Initialize state
    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      progress: 0,
    }
  }

  //   componentDidMount() {
  //     this.audioRef.current.addEventListener('ended', this.handleAudioEnded)
  //   }

  //   componentWillUnmount() {
  //     this.audioRef.current.removeEventListener('ended', this.handleAudioEnded)
  //   }

  // Play/Pause Toggle
  togglePlayPause = () => {
    const {isPlaying} = this.state
    const audio = this.audioRef.current

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }

    this.setState({isPlaying: !isPlaying})
  }

  // Update current time and progress as audio plays
  handleTimeUpdate = () => {
    const audio = this.audioRef.current
    this.setState({
      currentTime: audio.currentTime,
      progress: (audio.currentTime / audio.duration) * 100 || 0,
    })
  }

  // Set duration when audio is loaded
  handleLoadedMetadata = () => {
    this.setState({duration: this.audioRef.current.duration})
  }

  // Seek functionality
  handleSeek = e => {
    const newProgress = e.target.value
    const {duration} = this.state
    const newTime = (newProgress / 100) * duration
    this.audioRef.current.currentTime = newTime

    this.setState({
      currentTime: newTime,
      progress: newProgress,
    })
  }

  // Helper function to format time as MM:SS
  formatTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  // Pause playback when audio ends

  handleAudioEnded = () => {
    this.setState({isPlaying: false})
  }

  render() {
    const audioSrc =
      'https://p.scdn.co/mp3-preview/7908c3512a17427dbb2747fda555aa84aedeef0d?cid=586717cbf95c40208f5c6a4dca4361a4'
    const trackTitle = 'Unknown Track'
    const artistName = 'Unknown Artist'

    const {isPlaying, currentTime, duration, progress} = this.state

    return (
      <div className="spotify-player">
        <audio
          ref={this.audioRef}
          src={audioSrc}
          onTimeUpdate={this.handleTimeUpdate}
          onLoadedMetadata={this.handleLoadedMetadata}
          aria-label={`${trackTitle} by ${artistName}`}
        >
          <track kind="captions" />
        </audio>

        <div className="track-info">
          <h3>{trackTitle}</h3>
          <p>{artistName}</p>
        </div>

        <div className="controls">
          <button type="button" onClick={this.togglePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={this.handleSeek}
          />

          <span>
            {this.formatTime(currentTime)} / {this.formatTime(duration)}
          </span>
        </div>
      </div>
    )
  }
}

export default DummyRoute
