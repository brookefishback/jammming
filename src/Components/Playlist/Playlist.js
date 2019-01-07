import React from 'react';
import './Playlist.css';

class Playlist extends React.Component {
    constructor (props){
        super (props);
        this.handleNameChange = this.handleNameChange.bind(this)
    }
        handleNameChange(event){
            this.props.handleNameChange(event);
        }
    render () {
        return (
        <div class="Playlist">
        <input value="New Playlist"/>
        <TrackList tracks={this.props.playlistTracks}
          isRemoval={true}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}/>
        <a class="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
          </div>    
        )
    }
}

export default Playlist;