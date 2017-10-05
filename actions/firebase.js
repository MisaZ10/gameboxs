import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDjJN2mf5TGnivtHLEbuj8bPW2dGrbRJsE',
    authDomain: 'gameboxs-349fd.firebaseapp.com',
    databaseURL: 'https://gameboxs-349fd.firebaseio.com',
    projectId: 'gameboxs-349fd',
    storageBucket: '',
    messagingSenderId: '476694775950'
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const dataBase = firebase.database();

export default firebase;
