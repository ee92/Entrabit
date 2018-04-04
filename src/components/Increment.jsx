const React = require('react')

import TextField from 'material-ui-next/TextField'
import IconButton from 'material-ui/IconButton'
import { InputAdornment } from 'material-ui-next/Input'

const Increment = (props) => (
  <TextField
    fullWidth={true}
    value={props.value}
    InputProps={{
      endAdornment:
        <InputAdornment position="end">
          <IconButton onClick={() => props.incUp(props.setting)}>
            <span><i className="fas fa-angle-up see light"></i></span>
          </IconButton>
          <IconButton onClick={() => props.incDown(props.setting)}>
            <span><i className="fas fa-angle-down see light"></i></span>
          </IconButton>
        </InputAdornment>
    }}
  />
)

module.exports = Increment
