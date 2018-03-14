const React = require('react')
const words = require('an-array-of-english-words')
const icons = require('./../../icons.js')
const md5 = require('md5')

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'
import PasswordField from 'material-ui-password-field'
import FontIcon from 'material-ui/FontIcon'

class Generate extends React.Component {

  state = {
    sites: [],
    username: null,
    site: 'Website',
    aid: [],
    password: words[155]
  }

  visualAid = (text) => {
    if (text) {
      let hash = md5(text).split('').filter((x) => !isNaN(Number(x)))
      let aid = []
      aid.push(icons[hash.slice(0,7).join('') % icons.length])
      aid.push(icons[hash.slice(7,14).join('') % icons.length])
      aid.push(icons[hash.slice(14,21).join('') % icons.length])
      this.setState({aid})
    } else {
      this.setState({aid: []})
    }
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
            onClose={() => console.log('test')}
            onUpdateInput={(site) => this.setState({site})}
            openOnFocus={true}
            filter={AutoComplete.caseInsensitiveFilter}
            fullWidth={true}/>
          <TextField
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
            onClick={() => this.setState({password: 'testing123'})}
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
