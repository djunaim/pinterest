import './singleBoard.scss';
import utilities from '../../helpers/utilities';
import pinsPrint from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';

const buildSingleBoard = (e) => {
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
    })
    .catch((error) => console.error(error));
};

export default { buildSingleBoard };
