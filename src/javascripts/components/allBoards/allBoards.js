import $ from 'jquery';
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

const showSingleBoard = (e) => {
  const boardID = e.target.id;
  pinsData.getPinsByBoardId(boardID)
    .then((pins) => {
      console.log('here it is', pins);
      let domString = '<div id="boardSection" class="d-flex flex-wrap">';
      pins.forEach((pin) => {
        domString += pinsPrint.makeAPin(pin);
      });
      domString += '</div>';
      utilities.printToDOM('boards', domString);
    })
    .catch((error) => console.error(error));
};

const buildAllBoard = (uid) => {
  boardsData.getBoardByUid(uid)
    .then((boards) => {
      console.log('it worked', boards);
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
