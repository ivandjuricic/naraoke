import React, {Component} from 'react';
import firebase, { emailCheck } from '../firebase.js';
import NewSongForm from './NewSongForm.jsx';
import { withRouter } from 'react-router-dom';
import { CSVLink } from "react-csv";


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: firebase.auth().currentUser,
        };
    }

    exportButton = () => {
      const { searchResults, disneyResults, miscResults } = this.props;
      const rows = [[], [], []]
      Object.keys(searchResults).forEach((key, index)=> {
        searchResults[[key]].forEach(song => rows[0].push([`${key} - ${song}`]))
      })
      Object.keys(disneyResults).forEach((key, index)=> {
        disneyResults[[key]].forEach(song => rows[1].push([`${key} - ${song}`]))
      })
      Object.keys(miscResults).forEach((key, index)=> {
        miscResults[[key]].forEach(song => rows[2].push([`${key} - ${song}`]))
      })
      const data = rows[0].map((col, i) => rows.map(row => row[i]));
      return (<div className='export-button-container'><CSVLink
        filename="Karaoke2019.csv"
        className="export-button"
        target="_blank"
        data={data}
      >Export list to CSV</CSVLink></div>)
    }

    // exportButton = () => {
    //   return (
    //     <button
    //       className="myButton"
    //       onClick={this.handleExport}
    //     >Export list to CSV</button>)
    // }

    render() { 
        const { user } = this.state;
        var valid = null;
        if (!user) {
          this.props.history.push("/");
        } else {
          valid = emailCheck(user.email) ? true : false;
        }
        if (!valid) {
          this.props.history.push("/");
        }
        return (
            <div className="wrapper">
              { user && valid && <NewSongForm /> }
              <hr />
              { user && valid && this.exportButton()}
            </div>
        );
    }
}
 
export default withRouter(Admin);