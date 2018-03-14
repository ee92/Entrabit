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

const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()
const storage = firebase.storage()
const database = firebase.database()

module.exports = {
  firebase,
  provider,
  auth,
  storage,
  database
}
