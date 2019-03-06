import React, { Component } from 'react';

class Search extends Component {

    artistSongElement(key, values) {
        return (
        <div key={key} className="song-container">
          <h4 className="search-artist">{key}</h4>
          {values.map(song=>(
            <p key={`${key}-${song}`} className="search-song">{song}</p>))
          }
          <p key={key}><span className="white">...................................</span><span className="red">.........</span></p>
        </div>
        )
    }

    performSearch() {
        const { searchTerm } = this.props
        if (searchTerm.length === 1) {
            return this.searchByStarttingLetter()
        }
        if (searchTerm === '0-9') {
            return this.searchByStartingNumber()
        }
        if (searchTerm === 'Disney') {
            return this.searchDisney()
        }
        if (searchTerm === 'Misc') {
            return this.searchMisc()
        }
    }

    searchByStartingNumber() {
        const { searchResults } = this.props;
        const items = [];
        Object.entries(searchResults).forEach(entry => {
            const key = entry[0]
            const values = entry[1]
            if (key.charAt(0) <='9' && key.charAt(0) >='0') {
                items.push(
                    this.artistSongElement(key, values)
                )
            }
        });
        return items
    }

    searchDisney() {
        const { disneyData } = this.props;
        const items = [];
        Object.entries(disneyData).forEach(entry => {
            const key = entry[0]
            const values = entry[1]
            items.push(
                this.artistSongElement(key, values)
            )
        });
        return items            
    }

    searchMisc() {
        const { miscData } = this.props;
        const items = [];
        Object.entries(miscData).forEach(entry => {
            const key = entry[0]
            const values = entry[1]
            items.push(
                this.artistSongElement(key, values)
            )
        });
        return items            
    }

    searchByStarttingLetter() {
        const { searchResults, searchTerm } = this.props;
        const items = [];
        Object.entries(searchResults).forEach(entry => {
            const key = entry[0]
            const values = entry[1]
            if (key.charAt(0) === searchTerm && key !== 'Disney') {
                items.push(
                    this.artistSongElement(key, values)
                )
            }
        });
        return items
    }

    render() {
        return (
            <div>
                {this.performSearch()}
            </div>
        );
    }
}
 
export default Search;
