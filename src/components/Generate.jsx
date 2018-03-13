const React = require('react')

class Generate extends React.Component {

  render() {

    let styles = {
      root: {
        textAlign: 'center',
        width: '50%',
        margin: 'auto'
      }
    }

    return (
      <div style={styles.root}>
        <p style={styles.font}>
          Remember a single <i>master password</i>, and use it to generate the
          rest of your passwords... this app will never store <b>any</b> of them!
        </p>
        <input placeholder="username"/>
        <input placeholder="master password"/>
        <button>Generate</button>
      </div>
    )
  }

}
module.exports = Generate
