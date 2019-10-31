import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const allPinsDiv = $('#boards');
const logoutButton = $('#navbarButtonLogout');

const logoutEvent = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        authDiv.classList.add('hide');
        logoutButton.classList.add('hide');
        allPinsDiv.classList.add('hide');
      }).catch((err) => console.error('still logged in', err));
  });
};

export default { logoutEvent };
