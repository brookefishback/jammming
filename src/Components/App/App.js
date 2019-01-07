const redirectUri = 'http://localhost:3000/';
const clientId = 'ffc99a15c9364607927ed84cf973030d';
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        searchResults : [],
        playlistName  : "New Playlist",  
        playlistTracks: "Playlist Tracks", /// array?
        playlistId: null
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchResults = this.searchResults.bind(this);
  }

  search(term) {
    Spotify.search(term)
        .then(searchResults => 
        {this.setState({
        searchResults: searchResults
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
    const removal = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playlistTracks: removal});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
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
          <SearchBar searchSpotify={this.searchSpotify}
                  clearResults={this.clearResults} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.results} onAdd={this.addTrack} />
            <Playlist tracks={this.state.playlist} removeTrack={this.removeTrack} savePlaylist={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

