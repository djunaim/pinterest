import './singleBoard.scss';
import boardsData from '../../helpers/data/boardsData';

const buildSingleBoard = () => {
  boardsData.getBoard()
    .then((boards) => {
      console.log('it worked', boards);
    })
    .catch((error) => console.error(error));
};

export default { buildSingleBoard };
