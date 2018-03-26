const React = require('react')

import PasswordField from 'material-ui-password-field'

const Aid = (props) => (
  <div className='container'>
    <PasswordField
      onChange={(e,text) => props.visualAid(text)}
      style={{ flexGrow: 1}}
      fullWidth={true}
      floatingLabelText="Entrabit"
      underlineFocusStyle={{borderColor: '#4357AA'}}
      floatingLabelFocusStyle={{color: '#4357AA'}}
    />
      <div className='icons'>
        { props.aid &&
          props.aid.map((icon) => (
            <div key={icon[2]} style={{color: icon[1], minWidth: '28px', textAlign: 'center'}}>
              <i className={`fas fa-${icon[0]}`}></i>
            </div>
          ))
        }
      </div>
  </div>
)
module.exports = Aid
