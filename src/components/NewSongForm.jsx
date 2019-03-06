import React, { Component } from 'react';
import firebase from '../firebase';
import '../Form.css'

class NewSongForm extends Component {
  constructor(props) {
      super(props);
      this.ref = firebase.firestore().collection('Karaoke');

      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleOnRadioChange = this.handleOnRadioChange.bind(this);
      this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  state = {
      artist: "",
      song: "",
      type: "Regular"
  }
  
  handleOnChange(event, source) {
      this.setState({[source]: event.target.value})
  }

  handleOnRadioChange(event) {
    this.setState({type: event.target.value})
  }

  handleOnSubmit(event){
    event.preventDefault();
    const { type, artist, song } = this.state;
    this.ref.doc(type).update(
        {[artist]: firebase.firestore.FieldValue.arrayUnion(song)})
    .then(
      this.setState({artist: "", song: ""})
    )
  }

  render() {
    const { type } = this.state
    return (
        <div>
            <form onSubmit={this.handleOnSubmit}>
            <h2>Add new song</h2>
            <input 
              type="text" 
              placeholder="Artist" 
              name="artist" 
              value={this.state.artist}
              onChange={(event) => this.handleOnChange(event, "artist")} />
            <input 
              type="text" 
              placeholder="Song" 
              name="song" 
              value={this.state.song} 
              onChange={(event) => this.handleOnChange(event, "song")} />
            <div className="flex_container">
                <div className="current_items">
                    <div className="current_items__row">
                        <div className="wrapper_input">
                          <input 
                            id="Regular" 
                            type="radio" 
                            value='Regular'
                            checked={type === 'Regular'}
                            onChange={(e) => this.handleOnRadioChange(e, 'Regular')}
                          />
                          <label htmlFor="Regular">Regular</label>
                        </div>
                        <div className="wrapper_input">
                          <input 
                            type="radio"
                            value="Disney"
                            id="Disney" 
                            checked={type === 'Disney'}
                            onChange={(e) => this.handleOnRadioChange(e, 'Disney')}
                          />
                          <label htmlFor="Disney">Disney</label>
                        </div>
                        <div className="wrapper_input">
                          <input 
                            type="radio" 
                            value="Misc"
                            id="Misc"
                            checked={type === 'Misc'} 
                            onChange={(e) => this.handleOnRadioChange(e, 'Misc')}
                          />
                          <label htmlFor="Misc">Misc</label>
                        </div>
                    </div>
                </div>
            </div>
            <input
                  type="submit" 
                  value="Submit"
            />
          </form>
      </div>
    )
  }
};

export default NewSongForm;