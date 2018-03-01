const React = require('react')
const Preview = require('./Preview')
const Caption = require('./Caption')
import firebase, { storage, database } from '../firebase'
import RaisedButton from 'material-ui/RaisedButton'
import {GridList, GridTile} from 'material-ui/GridList'
import {Card, CardMedia} from 'material-ui/Card'
import TextField from 'material-ui/TextField'

class Folder extends React.Component {

  state = {
    user: this.props.user,
    create: false,
    parent: "",
    files: []
  }

  showInput = () => {
    this.setState({create: !this.state.create})
  }

  deleteFile = (key, folder) => {
    if (folder == false) {
      storage.ref(this.props.user.uid).child(key).delete()
    }
    database.ref(this.props.user.uid).child(key).remove()
  }

  createFolder = () => {
    let key = database.ref(this.props.user.uid).push().key
    database.ref(this.props.user.uid).child(key).set({
      "folder" : true,
      "name" : this.refs.folder.input.value,
      "parent" : this.state.parent
    })
    this.showInput()
  }

  openFolder = (parent) => {
    this.setState({
      parent: parent,
      files: []
    }, () => {
      this.handleChange()
    })
  }

  goBack = () => {
    if (this.state.parent) {
      database.ref(this.props.user.uid + "/" + this.state.parent).once('value', (snap) => {
        this.setState({
          parent: snap.val().parent,
          files: []
        }, () => {
          this.handleChange()
        })
      })
    }
  }

  handleChange = () => {
    if (this.ref) {this.ref.off()}
    this.ref = database.ref(this.props.user.uid).orderByChild('parent').equalTo(this.state.parent)

    this.ref.on('child_added', (child) => {
      let f = {
        folder: child.val().folder,
        key: child.key,
        url: child.val().url,
        name: child.val().name,
        parent: child.val().parent
      }
      this.setState((state) => {
        let files = state.files.slice()
        files.push(f)
        return {files}
      })
    })

    this.ref.on('child_removed', (child) => {
      let files = this.state.files.filter((file) => {
        return file.key != child.key
      })
      this.setState({files})
    })

    this.ref.on('child_changed', (child) => {
      let files = this.state.files.filter((file) => {
        return file.key != child.key
      })
      files.push({
        folder: child.val().folder,
        key: child.key,
        url: child.val().url,
        name: child.val().name,
        parent: child.val().parent
      })
      this.setState({files})
    })
  }

  componentDidMount() {
    this.handleChange()
  }

  render() {

    const styles = {
      button: {
        margin: 12
      },
      card: {
        textAlign: 'center',
        margin: 48
      }
    }

    let files = (this.state.files.length == 0) ?
      <h4>you have no files</h4> :
      <div>
        {this.state.files.slice(0).reverse().map((file) => {
          if (file.folder) {
            return(

              <Card style={styles.card} key={file.key}>
                <RaisedButton onClick={this.openFolder.bind(this, file.key)}
                  label="open"
                  style={styles.button}></RaisedButton>
                <Caption
                  name={file.name}
                  file={file.key}
                  user={this.props.user}
                  parent={this.state.parent}
                />
                <RaisedButton onClick={this.deleteFile.bind(this, file.key, true)}
                  name={file.key}
                  folder="true"
                  label="remove"
                  style={styles.button}
                ></RaisedButton>
              </Card>
            )
          }
          else {
            return(
              <Card style={styles.card} key={file.key}>
                <CardMedia>
                  <img src={file.url}/>
                </CardMedia>
                <Caption
                  name={file.name}
                  file={file.key}
                  user={this.props.user}
                  parent={this.state.parent}/>
                <RaisedButton onClick={this.deleteFile.bind(this, file.key, false)}
                  name={file.key}
                  folder="false"
                  label="remove"
                  style={styles.button}
                ></RaisedButton>
              </Card>
            )
          }
        })}
      </div>

    let newFolder = (this.state.create) ?
      <div>
        <TextField ref='folder'
          onFocusOut={this.showInput}
        />
        <RaisedButton onClick={this.createFolder}
          style={styles.button}
          label="create"></RaisedButton>
      </div> :
      <RaisedButton onClick={this.showInput}
        style={styles.button}
        label="create folder"></RaisedButton>

    let backButton = (this.state.parent != "") ?
      <div>
        <RaisedButton onClick={this.goBack}
          style={styles.button}
          label="<-"></RaisedButton>
      </div> :
      null


    return (
      <div>
        {newFolder}
        <Preview
          user={this.props.user}
          parent={this.state.parent}
        />
        {backButton}
        {files}
      </div>
    )
  }
}
module.exports = Folder
