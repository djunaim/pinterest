import utilities from '../helpers/utilities';
import signInButton from './c74ljgt1t4o1ko28ycm8.png';

const loginButton = () => {
  const domString = `<button id="googleAuth" class="btn btn-primary">
   <img src=${signInButton}/>
  </button>`;
  utilities.printToDOM('auth', domString);
};

export default { loginButton };
