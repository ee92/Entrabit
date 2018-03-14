const React = require('react')
const words = require('an-array-of-english-words')
const icons = require('./../../icons.js')
const scrypt = require('scryptsy')
const md5 = require('md5')

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'
import PasswordField from 'material-ui-password-field'
import FontIcon from 'material-ui/FontIcon'

import firebase, { storage, database } from '../firebase'

class Generate extends React.Component {

  state = {
    user: this.props.user,
    sites: [],
    username: '',
    site: 'Website',
    aid: [],
    password: words[155],
    bit: ''
  }

  visualAid = (text) => {
    if (text) {
      let hash = md5(text).split('').filter((x) => !isNaN(Number(x)))
      let aid = []
      aid.push(icons[hash.slice(0,7).join('') % icons.length])
      aid.push(icons[hash.slice(7,14).join('') % icons.length])
      aid.push(icons[hash.slice(14,21).join('') % icons.length])
      this.setState({aid, bit: text})
    } else {
      this.setState({aid: []})
    }
  }

  selectSite = () => {
    database.ref(this.state.user.uid).on('value', (sites) => {
      sites.forEach((site) => {
        if (site.key == this.state.site) {
          console.log(site.val().username)
          this.setState({username: site.val().username})
        }
      })
    })
  }

  storeUsername = () => {
    let updates = {
      'username' : this.state.username
    }
    database.ref(this.state.user.uid + '/' + this.state.site).set(updates)
  }

  createPassword = () => {
    let str = this.state.username + this.state.bit
    let hash = scrypt(this.state.site, str, 16384, 8, 1, 64).toString('hex')
      .split('').filter((x) => !isNaN(Number(x)))
    let password = words[hash.slice(0,12).join('') % words.length]
    this.setState({password})
    this.storeUsername()
  }

  render() {
    return (
      <div className='app'>
        <p>
          Remember a single <i>master password</i>, and use it to generate the
          rest of your passwords... this app will never store <b>any</b> of them!
        </p>
        <div className='inputs'>
          <AutoComplete
            floatingLabelText="Website"
            dataSource={['Facebook','Google','Twitter']}
            onClose={this.selectSite}
            onUpdateInput={(site) => this.setState({site})}
            openOnFocus={true}
            filter={AutoComplete.caseInsensitiveFilter}
            fullWidth={true}/>
          <TextField
            onChange={(e, username) => this.setState({username})}
            value={this.state.username}
            floatingLabelText="Username/Email"
            fullWidth={true}/>
          <div className='aid'>
            <PasswordField
              onChange={(e,text) => this.visualAid(text)}
              style={{ flexGrow: 1}}
              fullWidth={true}
              floatingLabelText="Entrabit"/>
              <div className='icons'>
                { this.state.aid &&
                  this.state.aid.map((icon) => (
                    <i className="material-icons" key={icon}>{icon}</i>
                  ))
                }
              </div>
          </div>
          <RaisedButton
            onClick={this.createPassword}
            label="generate"
            primary={true}
            fullWidth={true}/>
          <PasswordField
            floatingLabelText={`Password for ${this.state.site}`}
            disableButton={false}
            underlineFocusStyle={{borderBottom: 'none'}}
            value={this.state.password}
            fullWidth={true}/>
        </div>
      </div>
    )
  }
}
module.exports = Generate
