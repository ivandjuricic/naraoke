import React, { Component } from 'react';
import { NUMBERS_BROWSE, CATEGORY, ALPHABET_START, ALPHABET_END } from '../consts';


class AlphabetBrowse extends Component {

    _createLetterButtons = () => {
        const { handleClickButton } = this.props;
        const itemList = []    
        for (let i = ALPHABET_START; i < ALPHABET_END; i++) {
          const letter = String.fromCharCode(i);
          itemList.push(
            <button className="myButton"
              key={letter}
              onClick={(e) =>handleClickButton(letter)}>{letter}
            </button>)
        };
        const numbersItem = (
          <button className="myButton" key='numbers' onClick={(e) =>handleClickButton(NUMBERS_BROWSE)}>{NUMBERS_BROWSE}</button>
        );
        itemList.push(numbersItem);
        const disneyItem = (<button className="myButton" key='disney' onClick={(e) =>handleClickButton(CATEGORY.disney)}>Disney</button>);
        itemList.push(disneyItem);
        const miscItem = (<button className="myButton" key='misc' onClick={(e) =>handleClickButton(CATEGORY.misc)}>Misc</button>);
        itemList.push(miscItem);
        return itemList;
      }


    render() {
        return (
            <div className='App-LetterBrowse'>
                <ul>
                {this._createLetterButtons()}
                </ul>
            </div>
        );
    }
}
 
export default AlphabetBrowse;
 