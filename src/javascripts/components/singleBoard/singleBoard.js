import firebase from 'firebase/app';
import 'firebase/auth';

import './singleBoard.scss';
// import smash from '../../helpers/data/smash';
// import utilities from '../../helpers/utilities';
// import pins from '../pins/pins';
import boardsData from '../../helpers/data/boardsData';
// import pinsData from '../../helpers/data/pinsData';

// const buildSingleBoard = () => {
//   smash.getCompleteBoard()
//     .then((boards) => {
//       console.log('it worked', boards);
//       let domString = '<div id="boardSection" class="d-flex flex-wrap">';
//       boards.forEach((board) => {
//         domString += pins.makeAPin(board);
//       });
//       domString += '</div>';
//       utilities.printToDOM('boards', domString);
//     })
//     .catch((error) => console.error(error));
// };

const buildSingleBoard = () => {
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoardByUid(uid)
    .then((boards) => {
      console.log('it worked', boards);
    })
    .catch((error) => console.error(error));
};

export default { buildSingleBoard };
