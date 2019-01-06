import React from 'react';
import './App.css';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        searchResults : [],
        playlistName  : "New Playlist",  
        playlistTracks: "Playlist Tracks", ///maybe do an array?
        playlistId: null
    };
      this.searchSpotify = this.searchSpotify.bind(this);
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.clearResults = this.clearResults.bind(this);
  }

  searchSpotify(term) {
    Spotify.search(term).then(
      results => {
        this.setState({
          results: results
        });
      }
    );
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    let updatedPlaylist = this.state.playlist;
    updatedPlaylist.push(track);
    this.setState({ playlist: updatedPlaylist });
  }

  removeTrack(track) {
    const index = this.state.playlist.indexOf(track);
    let updatedPlaylist = this.state.playlist;
    updatedPlaylist.splice(index, 1);
    this.setState({ playlist: updatedPlaylist });
  }

  savePlaylist(name, tracks) {
    Spotify.savePlaylist(name, tracks).then(
      () => {
        this.setState({
          playlist: []
        });
      }
    );
  }

  clearResults() {
    this.setState({
      results: []
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <Search searchSpotify={this.searchSpotify}
                  clearResults={this.clearResults} />
          <div className="App-playlist">
            <Results tracks={this.state.results} 
                      addTrack={this.addTrack} />
            <Playlist tracks={this.state.playlist} 
                      removeTrack={this.removeTrack} 
                      savePlaylist={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

