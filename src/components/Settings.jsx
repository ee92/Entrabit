const React = require('react')

import AppBar from 'material-ui-next/AppBar'
import Paper from 'material-ui-next/Paper'
import Tabs, { Tab } from 'material-ui-next/Tabs'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui-next/TextField'
import IconButton from 'material-ui/IconButton'
import { InputAdornment } from 'material-ui-next/Input'


class Settings extends React.Component {

  state = {
    value: 0
  }

  render() {
    return (
      <div className='space'>
        <AppBar position="static" color="default">
          <Tabs
            fullWidth
            value={this.state.value}
            onChange={(e, value) => this.setState({value})}
          >
            <Tab label="Memorizable" />
            <Tab label="Non-memorizable" />
          </Tabs>
        </AppBar>
        <Paper className="space-in">
          <Checkbox
            label='Captialize first letter'
            checked={this.props.settings.caps}
            onCheck={(e, checked) => this.props.setCheck('caps', checked)}
          />
          <Checkbox
            label='Include digit'
            checked={this.props.settings.numbers}
            onCheck={(e, checked) => this.props.setCheck('numbers', checked)}
          />
          <Checkbox
            label='Include symbol'
            checked={this.props.settings.symbols}
            onCheck={(e, checked) => this.props.setCheck('symbols', checked)}
          />
          {this.state.value == 0 &&
            <TextField
              helperText="# of words"
              value={3}
              InputProps={{
                startAdornment:
                  <InputAdornment position="start">
                    <IconButton>
                      <i className="material-icons light">remove</i>
                    </IconButton>
                  </InputAdornment>,
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton>
                      <i className="material-icons light">add</i>
                    </IconButton>
                  </InputAdornment>,
                style: {width: '50%', textAlign: 'center'}
              }}
            />
          }
          {this.state.value == 1 &&
            <TextField
              helperText="Length"
              value={16}
              InputProps={{
                startAdornment:
                  <InputAdornment position="start">
                    <IconButton>
                      <i className="material-icons light">remove</i>
                    </IconButton>
                  </InputAdornment>,
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton>
                      <i className="material-icons light">add</i>
                    </IconButton>
                  </InputAdornment>,
                style: {width: '50%', textAlign: 'center'}
              }}
            />
          }
        </Paper>
      </div>
    )
  }
}
module.exports = Settings
