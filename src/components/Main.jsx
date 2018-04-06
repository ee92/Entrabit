const React = require('react')
const Generate = require('./Generate')
const About = require('./About')

import firebase, { auth, googleProvider, githubProvider } from '../firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog, { DialogActions, DialogTitle } from 'material-ui-next/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'

class Main extends React.Component {

  state = {
    user: null,
    avatar: null,
    login: false
  }

  showLogin = () => {
    this.setState({login: true})
  }
  login = (provider) => {
    auth.signInWithPopup(provider)
    this.setState({login: false})
  }
  logout = () => { auth.signOut()}

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      let avatar = user ? user.photoURL : null
      this.setState({user, avatar})
    })
  }

  render() {
    const styles = {
      button: {
        margin: 6,
        color: 'white'
      },
      pic: {
        margin: 6,
        float: 'right'
      }
    }

    let authButton = this.state.user
      ? <div>
          <FlatButton onClick={this.logout} style={styles.button}
            label="Log Out"></FlatButton>
          <Avatar src={this.state.avatar} style={styles.pic}/>
        </div>

      : <FlatButton onClick={this.showLogin} style={styles.button}
          label="log in">
        </FlatButton>

    let app = !this.state.user
      ? <h4 style={{textAlign: 'center'}}>Log in to use app</h4>
      : <Generate user={this.state.user}/>

    return (
      <MuiThemeProvider>
        <div style={{backgroundColor: '#c0cbff'}}>
          <AppBar
            title='EntraBit'
            showMenuIconButton={false}
            iconElementRight={authButton}
            style={{backgroundColor: '#4255AC'}}
          />
          {app}
          <About/>
          <Dialog
            open={this.state.login}
            onClose={() => this.setState({login: false})}
          >
            <DialogTitle>Login/Register</DialogTitle>
            <div className="center" style={{display: 'flex', flexDirection: 'column'}}>
              <RaisedButton
                label="Sign in with Google"
                onClick={() => this.login(googleProvider)}
                className="space"
              />
              <RaisedButton
                label="Sign in with GitHub"
                onClick={() => this.login(githubProvider)}
                className="space"
              />
            </div>

          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}
module.exports = Main
