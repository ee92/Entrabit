const React = require('react')
const Generate = require('./Generate')
import firebase, { auth, provider } from '../firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'

class Main extends React.Component {

  state = {
    user: null,
    avatar: null
  }

  login = () => { auth.signInWithPopup(provider) }
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

      : <FlatButton onClick={this.login} style={styles.button}
          label="log in">
        </FlatButton>

    let app = !this.state.user
      ? <h4>Log in to use app</h4>
      : <Generate user={this.state.user}/>

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title='EntraBit'
            showMenuIconButton={false}
            iconElementRight={authButton}
          />
          {app}
        </div>
      </MuiThemeProvider>
    )
  }
}
module.exports = Main
