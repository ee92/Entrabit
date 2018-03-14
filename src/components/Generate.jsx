const React = require('react')
const words = require('an-array-of-english-words')
const icons = require('./../../icons.js')
const scrypt = require('scryptsy')
const md5 = require('md5')

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'
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

  selectSite = () => {
    database.ref(this.props.user.uid).once('value', (sites) => {
      sites.forEach((site) => {
        if (site.key == this.state.site) {
          console.log(site.val().username)
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
    database.ref(this.props.user.uid).child(this.state.site).set({
      'username' : ''
    })
    this.setState({
      username: ''
    })
  }

  storeUsername = () => {
    let updates = {
      'username' : this.state.username
    }
    database.ref(this.props.user.uid + '/' + this.state.site).set(updates)
  }

  createPassword = () => {
    let str = this.state.username + this.state.bit
    let hash = scrypt(this.state.site, str, 16384, 8, 1, 64).toString('hex')
      .split('').filter((x) => !isNaN(Number(x)))
    let password = words[hash.slice(0,12).join('') % words.length]
    this.setState({password})
    this.storeUsername()
    this.getWebsites()
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

  componentDidMount() {
    this.getWebsites()
  }

  render() {

    let remove = this.state.websites.includes(this.state.site) ? 'delete' : 'clear'

    return (
      <div className='app'>
        <p>
          Remember a single <i>master password</i>, and use it to generate the
          rest of your passwords... this app will never store <b>any</b> of them!
        </p>
        <div className='inputs'>
          <div className='container'>
            <AutoComplete
              floatingLabelText="Website"
              dataSource={this.state.websites}
              onClose={this.selectSite}
              onUpdateInput={(site) => this.setState({site})}
              openOnFocus={true}
              filter={AutoComplete.caseInsensitiveFilter}
              fullWidth={true}
              searchText={this.state.site}
            />
            {(this.state.site) &&
              (<IconButton onClick={this.deleteSite}>
                <i className="material-icons light">{remove}</i>
              </IconButton>)
            }
          </div>
          <div className='container'>
            <TextField
              onChange={(e, username) => this.setState({username})}
              value={this.state.username}
              floatingLabelText="Username/Email"
              fullWidth={true}
            />
            {(this.state.username) &&
              (<IconButton onClick={this.deleteUsername}>
                <i className="material-icons light">{remove}</i>
              </IconButton>)
            }
          </div>
          <div className='container'>
            <PasswordField
              onChange={(e,text) => this.visualAid(text)}
              style={{ flexGrow: 1}}
              fullWidth={true}
              floatingLabelText="Entrabit"
            />
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
