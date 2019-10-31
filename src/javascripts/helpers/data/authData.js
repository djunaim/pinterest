import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const allPinsDiv = $('#boards');
const logoutNavbar = $('#navbarButtonLogout');
const home = $('#home');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      allPinsDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      home.addClass('hide');
    } else {
      allPinsDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
      home.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
