import './singleBoard.scss';
import utilities from '../../helpers/utilities';
import boardsPrint from '../boards/boards';
import boardsData from '../../helpers/data/boardsData';

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
    })
    .catch((error) => console.error(error));
};

export default { buildAllBoard };
