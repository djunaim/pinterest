import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../helpers/utilities';
import signInButton from './c74ljgt1t4o1ko28ycm8.png';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `<button id="googleAuth" class="btn btn-primary">
   <img src=${signInButton}/>
  </button>`;
  utilities.printToDOM('auth', domString);

  $('#googleAuth').click(signMeIn);
};

export default { loginButton };
