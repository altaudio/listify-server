import admin from 'firebase-admin'
import config from './config'
import serviceAccount from '../firebaseServiceAccount.json'

export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebase.databaseURL,
})
