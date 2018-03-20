const React = require('react')
const words = require('an-array-of-english-words')
const icons = require('./../../icons.js')
const scrypt = require('scryptsy')
const md5 = require('md5')

import Aid from './Aid'
import Info from './Info'
import Settings from './Settings'

import RaisedButton from 'material-ui/RaisedButton'
import PasswordField from 'material-ui-password-field'
import IconButton from 'material-ui/IconButton'

import firebase, { storage, database } from '../firebase'

class Generate extends React.Component {

  state = {
    websites: [],
    username: '',
    site: '',
    aid: [],
    password: '',
    bit: '',
    options: false,
    settings: {
      numbers: true,
      symbols: true,
      caps: true,
      spaces: false
    }
  }

  // used by Setttings
  toggleOptions = () => this.setState({options: !this.state.options})
  setCheck = (setting, checked) => {
    let settings = {...this.state.settings}
    settings[setting] = checked
    this.setState({settings})
  }

  // used by Info
  setUser = (username) => this.setState({username})
  setSite = (site) => this.setState({site})
  getSettings = () => {
    database.ref(this.props.user.uid).once('value', (sites) => {
      sites.forEach((site) => {
        if (site.key == this.state.site) {
          this.setState({
            username: site.val().username,
            settings: site.val().settings
          })
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
  deleteUsername = () => this.setState({username: ''})

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
      this.setState({aid: [], bit: text})
    }
  }

  // used by Generate
  createPassword = () => {
    let str = this.state.username + this.state.bit
    let hash = scrypt(this.state.site, str, 16384, 8, 1, 64).toString('hex')
      .split('').filter((x) => !isNaN(Number(x)))
    let password = words[hash.slice(0,12).join('') % words.length]
    this.setState({password})
    this.storeUserData()
    this.getWebsites()
  }
  storeUserData = () => {
    let updates = {
      'username' : this.state.username,
      'settings' : this.state.settings
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
            getSettings={this.getSettings}
            setUser={this.setUser}
            setSite={this.setSite}
          />
          <Aid
            visualAid={this.visualAid}
            aid={this.state.aid}
          />
          <div className="container">
            <RaisedButton
              onClick={this.createPassword}
              label="generate"
              primary={true}
              style={{ flexGrow: 1}}
              className="space"
              disabled={!(this.state.site && this.state.username && this.state.bit)}
            />
            <RaisedButton
              icon={<i className="material-icons">settings</i>}
              onClick={this.toggleOptions}
              className="space"
            />
          </div>
          {this.state.options && (
            <Settings
              options={this.state.options}
              settings={this.state.settings}
              setCheck={this.setCheck}
            />
          )}
          {this.state.password && (
            <PasswordField
              floatingLabelText={`Password for ${this.state.site || 'website'}`}
              disableButton={false}
              underlineFocusStyle={{borderBottom: 'none'}}
              value={this.state.password}
              fullWidth={true}
            />
          )}
        </div>
      </div>
    )
  }
}
module.exports = Generate
