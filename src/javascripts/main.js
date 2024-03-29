import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase';
import loginButton from './components/Auth/auth';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import logoutButton from './components/myNavbar/myNavbar';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  loginButton.loginButton();
  authData.checkLoginStatus();
  logoutButton.logoutEvent();
};

init();
