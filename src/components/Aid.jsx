const React = require('react')

import PasswordField from 'material-ui-password-field'

const Aid = (props) => (
  <div className='container'>
    <PasswordField
      onChange={(e,text) => props.visualAid(text)}
      style={{ flexGrow: 1}}
      fullWidth={true}
      floatingLabelText="Entrabit"
    />
      <div className='icons'>
        { props.aid &&
          props.aid.map((icon) => (
            <i className="material-icons" key={icon}>{icon}</i>
          ))
        }
      </div>
  </div>
)
module.exports = Aid
