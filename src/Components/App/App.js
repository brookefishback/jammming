import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [],
                playlistName: 'New Playlist',
                playlistTracks: []
                }

  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }else{
      let currentPlaylist = this.state.playlistTracks.slice();
      let currentSearchResults = this.state.searchResults.slice();
      currentPlaylist.push(track);
      for(let i = 0; i < currentSearchResults.length; i++){
        if(currentSearchResults[i] === track){
          currentSearchResults.splice(i, 1)
        }
      }
      this.setState({
        playlistTracks: currentPlaylist,
        searchResults: currentSearchResults
      });

    }
  }


  removeTrack(track){
    const removal = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    //Add logic for adding tracks back to the searchresults
    let currentSearchResults = this.state.searchResults.slice();
    if(currentSearchResults.find(savedTrack => savedTrack.id !== track.id) || currentSearchResults.length === 0){
      currentSearchResults.push(track);
  }
    this.setState({
      playlistTracks: removal,
      searchResults: currentSearchResults
    });
  }

  updatePlaylistName(name){
   this.setState({
      playlistName: name
    });

    console.log(this.state.playlistName);
 }

 savePlaylist(){
   const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
   Spotify.savePlaylist(this.state.playlistName, trackUris)
   this.setState((prevState) => {
       return {
         playlistName: 'New Playlist',
         playlistTracks: []
     }
    },
       () => {this.updatePlaylistName('New Playlist')}
     );

 }

  search(term){

    Spotify.search(term)
    .then(searchResults => this.setState({
      searchResults: searchResults
    }));
  }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName}/>
          </div>
        </div>
        <div>

        </div>

      </div>
    );
  }
}

export default App;
