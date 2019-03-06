import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCrMoN9momJi8nucthdb5j1Dv24E2nIxjg',
    authDomain: 'naraoke-3944f.firebaseapp.com',
    databaseURL: 'https://naraoke-3944f.firebaseio.com',
    projectId: 'naraoke-3944f',
    storageBucket: 'naraoke-3944f.appspot.com',
    messagingSenderId: '43957839464'
  };

export const emailCheck = (email) => { 
    const validEmails = ['nikrstic@gmail.com','djuricicivan@gmail.com'];
    const validEmail = validEmails.indexOf(email) > -1
    return validEmail;
}

firebase.initializeApp(config);
export default firebase;

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

