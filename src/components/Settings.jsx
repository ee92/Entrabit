const React = require('react')

import Checkbox from 'material-ui/Checkbox'

const Settings = (props) => (
  <div className='space'>
    <Checkbox
      label='number'
      checked={props.settings.numbers}
      onCheck={props.setNumbers}
    />
    <Checkbox
      label='symbol'
      checked={props.settings.symbols}
      onCheck={props.setSymbols}
    />
    <Checkbox
      label='captial letter'
      checked={props.settings.caps}
      onCheck={props.setCaps}
    />
    <Checkbox
      label='spaces'
      checked={props.settings.spaces}
      onCheck={props.setSpaces}
    />
  </div>
)

module.exports = Settings
