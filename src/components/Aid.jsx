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
            <div key={icon[0]} >
              <i className={`fas fa-${icon[0]}`} style={{color: icon[1], minWidth: '30px'}}></i>
            </div>
          ))
        }
      </div>
  </div>
)
module.exports = Aid
