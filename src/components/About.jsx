const React = require('react')

import how from "../../public/images/Index-02.png"
import Paper from 'material-ui-next/Paper'

class About extends React.Component {

  state = {
    width: window.innerWidth * .92
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({width: window.innerWidth * .92})
    })
  }

  render() {
    return (
      <div style={{backgroundColor: '#4255AC'}}>
        <h1 className='center roomy white'>How It Works</h1>
        <p className='center afee'>
          Your passwords are computed locally, using the name of the website you want to log into, your username, password preferences,
           and your master password (EntraBit). We store the site, username, and settings for you, so all you have to remember is your
           EntraBit.
        </p>
        <img src={how} style={{maxWidth: this.state.width}}/>
        <h1 className='center roomy white'>Features</h1>
        <div className='container-alt center'>
          <Paper style={{backgroundColor: '#7084e1'}} className='center roomy round wide'>
            <i className='fas fa-bolt afee double'></i>
            <p>
              Fast and easy to use. All you need is the name of the site, your username, and your single master password.
            </p>
          </Paper>
          <Paper style={{backgroundColor: '#7084e1'}} className='center roomy round wide'>
            <i className='fas fa-lock afee double'></i>
            <p>
              Secure from hackers. Your passwords are never stored or sent accross any network, so they can't be hacked.
            </p>
          </Paper>
          <Paper style={{backgroundColor: '#7084e1'}} className='center roomy round wide'>
            <i className='fas fa-users afee double'></i>
            <p>
              Manage multiple accounts. Access any of your passwords, any time. No internet needed.
            </p>
          </Paper>
        </div>
      </div>
    )
  }
}
module.exports = About
