import React, { Component } from 'react';


class AlphabetBrowse extends Component {

    _createLetterButtons = () => {
        const { handleClickButton } = this.props;
        const lis = []    
        for (let i = 65; i < 91; i++) {
          const letter = String.fromCharCode(i);
          lis.push(
            <button className="myButton"
              key={letter}
              onClick={(e) =>handleClickButton(letter)}>{letter}
            </button>)
        };
        const numbersItem = (<button className="myButton" key='numbers' onClick={(e) =>handleClickButton('0-9')}>0-9</button>);
        lis.splice(0, 0, numbersItem);
        const disneyItem = (<button className="myButton" key='disney' onClick={(e) =>handleClickButton('Disney')}>Disney</button>);
        lis.splice(5, 0, disneyItem);
        const miscItem = (<button className="myButton" key='misc' onClick={(e) =>handleClickButton('Misc')}>Misc</button>);
        lis.push(miscItem);
        return lis
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
 