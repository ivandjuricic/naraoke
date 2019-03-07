import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import firebase, { provider, emailCheck } from '../firebase';
import Avatar from '@material-ui/core/Avatar';
import { withRouter, Link } from 'react-router-dom';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const headerStyle = {
  backgroundImage: "url(https://i.ytimg.com/vi/WC9rHRP-mnQ/maxresdefault.jpg)"
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      anchorEl: null,
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.setState({ user, auth: true })
      }});
    firebase.auth().getRedirectResult().then(result => {
      const user = result.user;
      if (user != null) {
        this.setState({ user, auth: true });
      }
    }).catch(error => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
      } else {
        console.error(error);
      }
    });
  }
  
  login = () => {
      firebase.auth().signInWithRedirect(provider);
  }

  logout = () => {
    firebase.auth().signOut()
    .then( () => this.setState({user: null, auth: false, anchorEl: null}))
    .catch( () => this.setState({user: null, auth: false, anchorEl: null}))
  }

  menuItems = () => {
    if (firebase.auth().currentUser == null) {
      return <MenuItem onClick={this.login}>Log In</MenuItem>
    }
    return (
      <div>
        {emailCheck(firebase.auth().currentUser.email) ? (
        <React.Fragment>
          <MenuItem onClick={ () => {
            this.setState({anchorEl: null})
            this.props.history.push('/new')
          }}>Add song</MenuItem>
          <MenuItem onClick={ () => {
            this.setState({anchorEl: null})
            this.props.history.push('/player')
          }}>Add song</MenuItem>
        </React.Fragment>
        ): null}
        <MenuItem onClick= { () => {
          this.setState({anchorEl: null})
          this.logout()
          this.props.history.push("/")
        }
        }>Log Out</MenuItem>
      </div>);
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, user } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar style={headerStyle} position="static">
          <Toolbar>
            <Typography variant="h4" color="inherit" className={classes.grow}>
              <Link to="/" style={{textDecoration: 'none'}}><span role="img" aria-label="mic">🎤</span></Link>
            </Typography>
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  {auth && (user != null) ? <Avatar src={user.photoURL} /> : <AccountCircle /> }
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                { this.menuItems() }
                </Menu>
              </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Header));
