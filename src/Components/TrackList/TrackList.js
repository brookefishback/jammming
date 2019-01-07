import React from 'react';
import TrackList from './TrackList.css'
import Track from '../Track/Track';


class TrackList extends React.Component {
    constructor(props){
        super(props);
      }
    
      render() {
        return (
          <div className="TrackList">
              {this.props.tracks.map(track =>{
                return (
                  <Track
                    onRemove={this.props.onRemove}
                    onAdd={this.props.onAdd}
                    key={track.id}
                    track={track}
                    isRemoval={this.props.isRemoval} />);
              })}
          </div>
        );
      }
    }
    
    export default Tracklist;