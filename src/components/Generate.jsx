const React = require('react')
const wordList = require('more-words')
const icons = require('./../../icons.js')
const pbkdf2 = require('pbkdf2')
const md5 = require('md5')

import Aid from './Aid'
import Info from './Info'
import Settings from './Settings'

import RaisedButton from 'material-ui/RaisedButton'
import PasswordField from 'material-ui-password-field'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui-next/Snackbar'
import Button from 'material-ui-next/Button'
import Dialog, { DialogActions, DialogTitle } from 'material-ui-next/Dialog';

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
    copied: false,
    loading: false,
    settings: {
      memorable: true,
      symbols: true,
      symbolsUsed: '@#$%^&*?!',
      salt: false,
      saltUsed: '',
      length: 16,
      words: 3
    }
  }

  // copy to clipboard
  copy = () => {
    this.refs.password.select()
    document.execCommand("copy")
    this.setState({copied: true})
  }
  handleCopy = () => this.setState({copied: false})

  // used by Settings
  toggleOptions = () => this.setState({options: !this.state.options})
  set = (setting, state) => {
    let settings = {...this.state.settings}
    settings[setting] = state
    this.setState({settings})
  }
  incUp = (setting) => {
    let settings = {...this.state.settings}
    settings[setting] = settings[setting] + 1
    this.setState({settings})
  }
  incDown = (setting) => {
    let settings = {...this.state.settings}
    settings[setting] = settings[setting] - 1
    this.setState({settings})
  }
  salt = () => {
    let word = wordList[Math.floor(Math.random() * wordList.length)]
    this.set('saltUsed', word)
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
  createPassword = () => {
    const alfanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let str = this.state.username + this.state.bit + this.state.site
    let {memorable, length, salt, saltUsed, words, symbols, symbolsUsed} = this.state.settings

    saltUsed = salt ? saltUsed : ''
    let hash = pbkdf2.pbkdf2Sync(str, saltUsed, 1, 32, 'sha512').toString('hex')
      .split('').filter((x) => !isNaN(Number(x)))
    let number = hash[0]
    let symbol = symbols ?
      symbolsUsed.split('')[hash[1] % symbolsUsed.length] : ''

    let password = ''
    if (memorable) {
      for (let i=0; i<Number(words); i++) {
        let word = wordList[hash.slice(i*7,i*7+7).join('') % wordList.length]
        word = word.charAt(0).toUpperCase() + word.slice(1)
        password += word
      }
    } else {
      let offset = symbols ? 2 : 1
      for (let i=0; i<Number(length)-offset; i++) {
        let char = alfanum.split('')[hash.slice(2*i,2*i+2).join('') % alfanum.length]
        password += char
      }
    }

    password += number + symbol
    this.setState({password})
    this.storeUserData()
  }

  // load user sites
  componentDidMount() {this.getWebsites()}

  render() {
    return (
      <div className='app'>
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
            <Dialog
              open={this.state.options}
              onClose={() => this.setState({options: false})}
            >
              <DialogTitle>Password Settings</DialogTitle>
              <Settings
                settings={this.state.settings}
                incUp={this.incUp}
                incDown={this.incDown}
                set={this.set}
                salt={this.salt}
              />
              <DialogActions>
                <Button onClick={() => this.setState({options: false})}>
                  DONE
                </Button>
              </DialogActions>
            </Dialog>
          )}
          {this.state.password && (
            <div className="container">
              <PasswordField
                floatingLabelText={`Password for ${this.state.site}`}
                underlineFocusStyle={{borderBottom: 'none'}}
                value={this.state.password}
                style={{ flexGrow: 1}}
                fullWidth={true}
              />
              <IconButton onClick={this.copy}>
                <i className="material-icons light">content_paste</i>
              </IconButton>
            </div>
          )}
          <input
            value={this.state.password}
            ref='password'
            style={{position: 'absolute', left: '-1000px', top: '-1000px'}}
          />
          <Snackbar
            style={{textAlign: 'center'}}
            open={this.state.copied}
            onClose={this.handleCopy}
            autoHideDuration={1200}
            message="Copied!"
          />
        </div>
        {this.state.loading &&
          <p>loading..</p>
        }
      </div>
    )
  }
}
module.exports = Generate
