const React = require('react')

import TextField from 'material-ui-next/TextField'
import IconButton from 'material-ui/IconButton'
import { InputAdornment } from 'material-ui-next/Input'

const Increment = (props) => (
  <TextField
    helperText={props.setting}
    value={props.value}
    InputProps={{
      startAdornment:
        <InputAdornment position="start">
          <IconButton onClick={() => props.incDown(props.setting)}>
            <i className="material-icons light">remove</i>
          </IconButton>
        </InputAdornment>,
      endAdornment:
        <InputAdornment position="end">
          <IconButton onClick={() => props.incUp(props.setting)}>
            <i className="material-icons light">add</i>
          </IconButton>
        </InputAdornment>
    }}
  />
)

module.exports = Increment
