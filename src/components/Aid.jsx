const React = require('react')

import PasswordField from 'material-ui-password-field'

class Aid extends React.Component {

  render() {
    return (
      <div className='container'>
        <PasswordField
          onChange={(e,text) => this.props.visualAid(text)}
          style={{ flexGrow: 1}}
          fullWidth={true}
          floatingLabelText="Entrabit"
        />
          <div className='icons'>
            { this.props.aid &&
              this.props.aid.map((icon) => (
                <i className="material-icons" key={icon}>{icon}</i>
              ))
            }
          </div>
      </div>
    )
  }
}
module.exports = Aid
