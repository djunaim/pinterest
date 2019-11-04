import pinsData from './pinsData';
import boardsData from './boardsData';
import userBoardPinsData from './userBoardPinsData';

const getCompleteBoard = () => new Promise((resolve, reject) => {
  pinsData.getPins()
    .then((pins) => {
      boardsData.getBoard().then((boards) => {
        userBoardPinsData.getUserBoardPins().then((userBoardPins) => {
          const finalBoard = [];
          pins.forEach((pin) => {
            const newPin = { ...pin };
            const userBoardPinRecord = userBoardPins.find((x) => x.pinID === pin.id);
            const board = boards.find((x) => x.id === userBoardPinRecord.boardID);
            newPin.board = board;
            finalBoard.push(newPin);
          });
          resolve(finalBoard);
        });
      });
    })
    .catch((error) => reject(error));
});

export default { getCompleteBoard };
