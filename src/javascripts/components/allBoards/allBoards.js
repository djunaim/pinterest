import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './allBoards.scss';
import utilities from '../../helpers/utilities';
import boardsPrint from '../boards/boards';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import pinsPrint from '../pins/pins';

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

const close = () => {
  const { uid } = firebase.auth().currentUser;
  $(document).click((e) => {
    const buttonName = e.target.className;
    if (buttonName === 'closeButton') {
      // eslint-disable-next-line no-use-before-define
      buildAllBoard(uid);
    }
  });
};

const showSingleBoard = (e) => {
  const boardID = e.target.id;
  pinsData.getPinsByBoardId(boardID)
    .then((pins) => {
      console.log('here are the pins', pins);
      let domString = '<div id="boardSection" class="d-flex flex-wrap container"><span><button class="closeButton">x</button><span>';
      pins.forEach((pin) => {
        domString += pinsPrint.makeAPin(pin);
      });
      domString += '</div>';
      utilities.printToDOM('boards', domString);
      $('#boards').on('click', '.closeButton', close);
    })
    .catch((error) => console.error(error));
};

const buildAllBoard = (uid) => {
  boardsData.getBoardByUid(uid)
    .then((boards) => {
      console.log('here are the boards', boards);
      let domString = '<div id="boardSection" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardsPrint.makeABoard(board);
      });
      domString += '</div>';
      utilities.printToDOM('boards', domString);
      $('#boards').on('click', '.boardCard', showSingleBoard);
    })
    .catch((error) => console.error(error));
};

export default { buildAllBoard };
