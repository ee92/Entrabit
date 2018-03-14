const React = require('react')
const words = require('an-array-of-english-words')
const icons = require('./../../icons.js')

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
    password: words[155]
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
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
            <PasswordField
              style={{ flexGrow: 1}}
              fullWidth={true}
              floatingLabelText="Entrabit"/>
              <div className="icons">
                <i className="material-icons">{icons[Math.floor(Math.random() * icons.length)]}</i>
                <i className="material-icons">{icons[Math.floor(Math.random() * icons.length)]}</i>
                <i className="material-icons">{icons[Math.floor(Math.random() * icons.length)]}</i>
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
