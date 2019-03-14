import React from 'react';
import MediaPlayer from './MediaPlayer';
import ReactPlayer from 'react-player'

class Player extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      counter: 0,
      songList: [{aritst: "Abba", song:"Dancing Queen", url: null}, {"Warrant": "Cherry Pie"}],
      url: null,
      showWindowPortal: false,
      selectedSong: null,
    };
    
    this.playSong = this.playSong.bind(this);
    this.closeMediaPlayer = this.closeMediaPlayer.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      this.closeMediaPlayer();
    });
  }

  generateFileUrl = (e) => {
    e.preventDefault()
    const videoUrl = e.target.value;
    const url = URL.generateFileUrl(videoUrl)
    this.setState({url})
  }
  
  playSong() {
    this.setState(state => ({
      ...state,
      showWindowPortal: !state.showWindowPortal,
    }));
  }
  
  closeMediaPlayer() {
    this.setState({ showWindowPortal: false })
  }
  
  render() {
    const artist = Object.keys(this.state.songList[0])[0]
    const song  = Object.values(this.state.songList[0])[0]
    console.log(this.state.url)
    return (
      <div>
        <div>
          <h4>{`${artist} - ${song}`}</h4>
          <input type="file" name="video" onChange={(e)=>console.log(e.target.value)}/>
        </div>
        <button onClick={this.playSong}>
          {this.state.showWindowPortal ? 'Close the' : 'Open a'} Portal
        </button>
        <ReactPlayer url={this.state.url}/>
        {this.state.showWindowPortal && (
          <MediaPlayer>
            <ReactPlayer url={this.state.url}/>
          </MediaPlayer>
        )}
      </div>
    );
  }
}
export default Player;