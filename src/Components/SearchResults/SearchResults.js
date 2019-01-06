import React from 'react';
import './SearchResults.css';
import TrackList from './TrackList'


class SearchResults extends React.Component {
    render() {
        return (
            <div className='Results'>
                <h2>Results</h2>
                <TrackList action='+' onClick={this.props.addTrack} tracks={this.props.tracks} />
            </div>
        );
    }
}

export default SearchResults;

