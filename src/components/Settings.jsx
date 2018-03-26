const React = require('react')
const Increment = require('./Increment')

import Switch from 'material-ui-next/Switch'
import TextField from 'material-ui-next/TextField'
import IconButton from 'material-ui/IconButton'
import { InputAdornment } from 'material-ui-next/Input'
import { FormGroup, FormControlLabel } from 'material-ui-next/Form'

class Settings extends React.Component {

  componentDidMount() {
    (!this.props.settings.saltUsed && !this.props.settings.salt)
    && this.props.salt()
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
                onChange={(e, checked) => this.props.set('memorable', checked)}
                color="primary"
              />
            }
          />
          {this.props.settings.memorable
          ?
            <Increment
              value={this.props.settings.words + " words"}
              setting="words"
              incUp={this.props.incUp}
              incDown={this.props.incDown}
            />
          :
            <Increment
              value={this.props.settings.length + " characters"}
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
                onChange={(e, checked) => this.props.set('symbols', checked)}
                color="primary"
              />
            }
          />
          {this.props.settings.symbols &&
            <TextField
              onChange={(e) => this.props.set('symbolsUsed', e.target.value)}
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
                onChange={(e, checked) => this.props.set('salt', checked)}
                color="primary"
              />
            }
          />
          {this.props.settings.salt &&
            <TextField
              value={this.props.settings.saltUsed}
              fullWidth={true}
              id='salt'
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton onClick={() => this.props.salt()}>
                      <span><i className="fas fa-sync-alt see light"></i></span>
                    </IconButton>
                  </InputAdornment>
              }}
            />
          }
        </FormGroup>
      </div>
    )
  }
}
module.exports = Settings
