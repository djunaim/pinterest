import './singleBoard.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import pins from '../pins/pins';

const buildSingleBoard = () => {
  smash.getCompleteBoard()
    .then((boards) => {
      console.log('it worked', boards);
      let domString = '<div id="boardSection" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += pins.makeAPin(board);
      });
      domString += '</div>';
      utilities.printToDOM('boards', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildSingleBoard };
