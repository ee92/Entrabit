const React = require('react')

import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton'

class Info extends React.Component {

  render() {

    return (
      <div>
        <div className='container'>
          <AutoComplete
            floatingLabelText="Website"
            dataSource={this.props.websites}
            onClose={this.props.getSettings}
            onUpdateInput={(site) => this.props.setSite(site)}
            openOnFocus={true}
            filter={AutoComplete.noFilter}
            fullWidth={true}
            searchText={this.props.site}
            listStyle={{ maxHeight: 200, overflow: 'auto' }}
            underlineFocusStyle={{borderColor: '#4357AA'}}
            floatingLabelFocusStyle={{color: '#4357AA'}}
          />
          { this.props.websites.includes(this.props.site) &&
            (<IconButton onClick={this.props.deleteSite}>
              <span><i className="fas fa-trash-alt see light"></i></span>
            </IconButton>)
          }
        </div>
        <div className='container'>
          <TextField
            onChange={(e, username) => this.props.setUser(username)}
            value={this.props.username}
            floatingLabelText="Username/Email"
            underlineFocusStyle={{borderColor: '#4357AA'}}
            floatingLabelFocusStyle={{color: '#4357AA'}}
            fullWidth={true}
          />
        </div>
      </div>
    )
  }
}
module.exports = Info
