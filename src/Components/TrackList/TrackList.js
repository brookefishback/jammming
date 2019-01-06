import React from 'react';
import TrackList from './TrackList.css'
import Track from '../Track/Track';


class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
              {
                this.props.tracks.map( track => {
                    return <Track action={this.props.action} onClick={this.props.onClick} track={track} key={track.id} />;
                  }
                )
              }
            </div>
        );
    }
}

export default TrackList;