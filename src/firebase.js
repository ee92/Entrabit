const firebase = require('firebase')

const config = {
  apiKey: "AIzaSyDynbSpeLkdgARWObGwM8XlephUEnNthBE",
  authDomain: "entra-bit.firebaseapp.com",
  databaseURL: "https://entra-bit.firebaseio.com",
  projectId: "entra-bit",
  storageBucket: "entra-bit.appspot.com",
  messagingSenderId: "1036940921417"
};
firebase.initializeApp(config)

const googleProvider = new firebase.auth.GoogleAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()
const auth = firebase.auth()
const storage = firebase.storage()
const database = firebase.database()

module.exports = {
  firebase,
  auth,
  storage,
  database,
  googleProvider,
  githubProvider
}
