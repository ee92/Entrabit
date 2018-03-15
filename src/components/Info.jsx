const React = require('react')

import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton'

class Info extends React.Component {

  render() {

    let remove = this.props.websites.includes(this.props.site) ? 'delete' : 'clear'

    return (
      <div>
        <div className='container'>
          <AutoComplete
            floatingLabelText="Website"
            dataSource={this.props.websites}
            onClose={this.props.selectSite}
            onUpdateInput={(site) => this.props.setSite(site)}
            openOnFocus={true}
            filter={AutoComplete.caseInsensitiveFilter}
            fullWidth={true}
            searchText={this.props.site}
          />
          {(this.props.site) &&
            (<IconButton onClick={this.props.deleteSite}>
              <i className="material-icons light">{remove}</i>
            </IconButton>)
          }
        </div>
        <div className='container'>
          <TextField
            onChange={(e, username) => this.props.setUser(username)}
            value={this.props.username}
            floatingLabelText="Username/Email"
            fullWidth={true}
          />
          {(this.props.username) &&
            (<IconButton onClick={this.props.deleteUsername}>
              <i className="material-icons light">{remove}</i>
            </IconButton>)
          }
        </div>
      </div>
    )
  }
}
module.exports = Info
