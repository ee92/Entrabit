const React = require('react')

import TextField from 'material-ui-next/TextField'
import IconButton from 'material-ui/IconButton'
import { InputAdornment } from 'material-ui-next/Input'

const Increment = (props) => (
  <TextField
    value={props.value}
    InputProps={{
      endAdornment:
        <InputAdornment position="end">
          <IconButton onClick={() => props.incUp(props.setting)}>
            <i className="material-icons light">keyboard_arrow_up</i>
          </IconButton>
          <IconButton onClick={() => props.incDown(props.setting)}>
            <i className="material-icons light">keyboard_arrow_down</i>
          </IconButton>
        </InputAdornment>
    }}
  />
)

module.exports = Increment
