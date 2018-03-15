const React = require('react')
const words = require('an-array-of-english-words')
const icons = require('./../../icons.js')
const scrypt = require('scryptsy')
const md5 = require('md5')

import Aid from './Aid'
import Info from './Info'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import PasswordField from 'material-ui-password-field'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

import firebase, { storage, database } from '../firebase'

class Generate extends React.Component {

  state = {
    user: this.props.user,
    websites: [],
    username: '',
    site: '',
    aid: [],
    password: '',
    bit: ''
  }

  // used by Info

  setUser = (username) => { this.setState({username}) }
  setSite = (site) => { this.setState({site}) }

  selectSite = () => {
    database.ref(this.props.user.uid).once('value', (sites) => {
      sites.forEach((site) => {
        if (site.key == this.state.site) {
          this.setState({username: site.val().username})
        }
      })
    })
  }

  deleteSite = () => {
    database.ref(this.props.user.uid).child(this.state.site).remove()
    this.getWebsites()
    this.setState({
      password: '',
      site: ''
    })
  }

  deleteUsername = () => {
    this.setState({
      username: ''
    })
    this.state.site &&
    database.ref(this.props.user.uid).child(this.state.site).set({
      'username' : ''
    })
  }

  // used by Aid

  visualAid = (text) => {
    if (text) {
      let hash = md5(text).split('').filter((x) => !isNaN(Number(x)))
      let aid = []
      aid.push(icons[hash.slice(0,5).join('') % icons.length])
      aid.push(icons[hash.slice(5,10).join('') % icons.length])
      aid.push(icons[hash.slice(10,15).join('') % icons.length])
      this.setState({aid, bit: text})
    } else {
      this.setState({aid: []})
    }
  }

  // used by Generate

  createPassword = () => {
    let str = this.state.username + this.state.bit
    let hash = scrypt(this.state.site, str, 16384, 8, 1, 64).toString('hex')
      .split('').filter((x) => !isNaN(Number(x)))
    let password = words[hash.slice(0,12).join('') % words.length]
    this.setState({password})
    this.storeUsername()
    this.getWebsites()
  }

  storeUsername = () => {
    let updates = {
      'username' : this.state.username
    }
    database.ref(this.props.user.uid + '/' + this.state.site).set(updates)
  }

  getWebsites = () => {
    database.ref(this.props.user.uid).once('value', (sites) => {
      let websites = []
      sites.forEach((site) => {
        websites.push(site.key)
      })
      this.setState({websites})
    })
  }

  // load user sites

  componentDidMount() {
    this.getWebsites()
  }

  render() {

    return (
      <div className='app'>
        <p>
          Remember a single <i>master password</i>, and use it to generate the
          rest of your passwords... this app will never store <b>any</b> of them!
        </p>
        <div className='inputs'>
          <Info
            websites={this.state.websites}
            site={this.state.site}
            username={this.state.username}
            deleteSite={this.deleteSite}
            deleteUsername={this.deleteUsername}
            selectSite={this.selectSite}
            setUser={this.setUser}
            setSite={this.setSite}
          />
          <Aid
            visualAid={this.visualAid}
            aid={this.state.aid}
          />
          <RaisedButton
            onClick={this.createPassword}
            label="generate"
            primary={true}
            fullWidth={true}
          />
          <PasswordField
            floatingLabelText={`Password for ${this.state.site || 'website'}`}
            disableButton={false}
            underlineFocusStyle={{borderBottom: 'none'}}
            value={this.state.password}
            fullWidth={true}
          />
        </div>
      </div>
    )
  }
}
module.exports = Generate
