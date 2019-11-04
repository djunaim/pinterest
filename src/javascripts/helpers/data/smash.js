import pinsData from './pinsData';
import boardsData from './boardsData';
import userBoardPinsData from './userBoardPinsData';

const getCompleteBoard = () => new Promise((resolve, reject) => {
  boardsData.getBoard()
    .then((boards) => {
      pinsData.getPins().then((pins) => {
        userBoardPinsData.getUserBoardPins().then((userBoardPins) => {
          const finalBoard = [];
          boards.forEach((board) => {
            const newBoard = { ...board };
            const userBoardPinRecord = userBoardPins.find((x) => x.boardID === board.id);
            const pin = pins.find((x) => x.boardID === userBoardPinRecord.boardID);
            newBoard.pin = pin;
            finalBoard.push(newBoard);
          });
          resolve(finalBoard);
        });
      });
    })
    .catch((error) => reject(error));
});

export default { getCompleteBoard };
