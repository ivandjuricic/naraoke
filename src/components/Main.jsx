import React, { Component } from 'react';
import AlphabetBrowse from './AlphabetBrowse';
import Search from './Search';
import RandomImage from './RandomImage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.state = {
          type: 'artist',
          searchResults: this.props.searchResults,
          disneyResults: this.props.disneyResults,
          miscResults: this.props.miscResults,
          searchTerm: this.props.searchTerm,
          randomIndex: this.props.randInt
      }
    }

    handleClickButton(event) {
        this.setState({ searchTerm: event })
    }

    render() {
        const displayResults = this.state.searchTerm ? 
          <Search
            searchResults={this.state.searchResults}
            disneyData={this.state.disneyResults}
            miscData={this.state.miscResults}
            searchTerm={this.state.searchTerm}
          /> : <RandomImage randomIndex={this.state.randomIndex}/>
        return (
            <div className='App-content'>
              <div className='App-Main'>
                <AlphabetBrowse search='/' handleClickButton={this.handleClickButton}/>
              </div>

              {displayResults}
            </div>
        );
    }
}
 
export default Main;