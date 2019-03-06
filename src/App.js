import React, { Component } from 'react';
import './App.css';
import {Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Admin from './components/Admin';
import Player from './components/Player';
import Footer from './components/Footer';
import firebase from './firebase';


class App extends Component {

  state = {
    searchResults: null,
    disneyResults: null,
    miscResults: null,
  }

  componentDidMount() {
    this.ref = firebase.firestore().collection('Karaoke');
    this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    console.log(this.props.theme);
    if (querySnapshot != null) { 
      const regularData = querySnapshot.docs.find((doc => doc.id === 'Regular')).data()
      const disneyData = querySnapshot.docs.find((doc => doc.id === 'Disney')).data()
      const miscData = querySnapshot.docs.find((doc => doc.id === 'Misc')).data()
      this.setState(
        {
          searchResults: regularData,
          disneyResults: disneyData,
          miscResults: miscData
        }
      );
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={() => <Main 
            searchTerm={null}
            onCollectionUpdate={this.onCollectionUpdate}
            searchResults={this.state.searchResults}
            disneyResults={this.state.disneyResults}
            miscResults={this.state.miscResults} /> } 
          />
          <Route path='/new' component={() => <Admin
            searchResults={this.state.searchResults}
            disneyResults={this.state.disneyResults}
            miscResults={this.state.miscResults} /> }
          />
          <Route path='/player' component={Player} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
