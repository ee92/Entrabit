const React = require('react')
const Increment = require('./Increment')
const ps = require('pretty-seconds');

import Switch from 'material-ui-next/Switch'
import Radio, { RadioGroup } from 'material-ui-next/Radio'
import TextField from 'material-ui-next/TextField'
import IconButton from 'material-ui/IconButton'
import { InputAdornment } from 'material-ui-next/Input'
import { FormLabel, FormGroup, FormControlLabel } from 'material-ui-next/Form'

class Settings extends React.Component {

  state = {
    strength: 0
  }

  calculateStrength = (props) => {
    const wordListLength = props.wordcount
    const { memorable, words, length, symbols, symbolsUsed } = props.settings
    if (memorable) {
      let wordEntropy = words * Math.log2(wordListLength)
      let symbolEntropy = symbols ? Math.log2(symbolsUsed.length) : 0
      let totalEntropy = wordEntropy + symbolEntropy + 1
      let strength = Math.floor(Math.pow(2, totalEntropy)) / 1000000
      this.setState({strength})
    } else {
      let characters = symbols ? (length - 2) : (length - 1)
      let symbolEntropy = symbols ? Math.log2(symbolsUsed.length) : 0
      let characterEntropy = Math.log2(62) * length
      let totalEntropy = characterEntropy + symbolEntropy + 1
      let strength = Math.floor(Math.pow(2, totalEntropy)) / 1000000
      this.setState({strength})
    }
  }

  componentWillReceiveProps(props){
    this.calculateStrength(props)
  }

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
            <div>
              <FormGroup row={true}>
                <FormControlLabel
                  label="small wordset"
                  control={
                    <Radio
                      color='primary'
                      checked={this.props.settings.wordList === "s"}
                      value="s"
                      onChange={() => this.props.set("wordList", "s")}
                    />
                  }
                />
                <FormControlLabel
                  label="medium wordset"
                  control={
                    <Radio
                      color='primary'
                      checked={this.props.settings.wordList === "m"}
                      value="m"
                      onChange={() => this.props.set("wordList", "m")}
                    />
                  }
                />
                <FormControlLabel
                  label="large wordset"
                  control={
                    <Radio
                      color='primary'
                      checked={this.props.settings.wordList === "l"}
                      value="l"
                      onChange={() => this.props.set("wordList", "l")}
                    />
                  }
                />
              </FormGroup>
              <Increment
                value={this.props.settings.words + " words"}
                setting="words"
                incUp={this.props.incUp}
                incDown={this.props.incDown}
              />
            </div>
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
        <div className='space-in'>
          <p>Your password will require</p>
          <p className='space-in'>{ps(this.state.strength)}</p>
          <p>to crack at 1 MILLION guesses/second</p>
        </div>
      </div>
    )
  }
}
module.exports = Settings
