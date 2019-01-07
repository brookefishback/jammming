import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor (props){
        super (props);
        this.handleNameChange = this.handleNameChange.bind(this)
    }
        handleNameChange(event){
            this.props.handleNameChange(event);
        }
        render(){
            return(
              <div className="Playlist">
            <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
            <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks}/>
            <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
          </div>
            )
          }
        }

export default Playlist;