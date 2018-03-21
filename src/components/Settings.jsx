const React = require('react')
const Increment = require('./Increment')

import Switch from 'material-ui-next/Switch'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import { FormGroup, FormControlLabel } from 'material-ui-next/Form'

class Settings extends React.Component {

  state = {
    value: 0
  }

  render() {
    return (
      <div className='space'>
        <FormGroup>
          <FormControlLabel
            label="Memorizable"
            control={
              <Switch
                checked={this.props.settings.memorable}
                onChange={(e, checked) => this.props.setCheck('memorable', checked)}
                color="primary"
              />
            }
          />
          {this.props.settings.memorable
          ?
            <Increment
              value={this.props.settings.words}
              setting="words"
              incUp={this.props.incUp}
              incDown={this.props.incDown}
            />
          :
            <Increment
              value={this.props.settings.length}
              setting="length"
              incUp={this.props.incUp}
              incDown={this.props.incDown}
            />
          }
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            label="Symbols"
            control={
              <Switch
                checked={this.props.settings.symbols}
                onChange={(e, checked) => this.props.setCheck('symbols', checked)}
                color="primary"
              />
            }
          />
          {this.props.settings.symbols &&
            <TextField
              onChange={(e, symbols) => this.props.set('symbolsUsed', symbols)}
              value={this.props.settings.symbolsUsed}
              fullWidth={true}
              id='symbols'
            />
          }
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            label="Salt"
            control={
              <Switch
                checked={this.props.settings.salt}
                onChange={(e, checked) => {
                  checked && this.props.salt()
                  this.props.setCheck('salt', checked)
                }}
                color="primary"
              />
            }
          />
          {this.props.settings.salt &&
            <div className="container">
              <TextField
                onChange={(e, salt) => this.props.set('saltUsed', salt)}
                value={this.props.settings.saltUsed}
                fullWidth={true}
                id='salt'
              />
              <IconButton onClick={this.props.salt}>
                <i className="material-icons light">autorenew</i>
              </IconButton>
            </div>
          }
        </FormGroup>
      </div>
    )
  }
}
module.exports = Settings
