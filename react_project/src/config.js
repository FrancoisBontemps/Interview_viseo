

export const data = require('./Interview');
export let firebase = require('firebase');
let config = {
    apiKey: 'AIzaSyB8ykXmTGGQIq7uWZCupWH6ZAP_PGgMwCA',
    authDomain: 'interview-viseo.firebaseapp.com',
    databaseURL: 'https://interview-viseo.firebaseio.com',
    projectId: 'interview-viseo',
    storageBucket: 'interview-viseo.appspot.com',
    messagingSenderId: '233151678963'
};
firebase.initializeApp(config);
