import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        term: ''
      };
      this.search = this.search.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
    }
  
    search(){
      console.log('search');
      this.props.onSearch(this.state.term);
  
    }
  
    handleTermChange(event){
      this.setState({term: event.target.value});
    }


    render() {
        <div class="SearchBar">
        <input onChange={this.handleTermChamge} placeholder="Enter A Song, Album, or Artist" />
        <a>SEARCH</a>
      </div>   
    }
}

export default SearchBar;