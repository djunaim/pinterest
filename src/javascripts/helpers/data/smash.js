import pinsData from './pinsData';
import boardsData from './boardsData';


const getCompleteBoard = () => new Promise((resolve, reject) => {
  pinsData.getPinsByBoardId()
    .then((pins) => {
      boardsData.getBoardByUid().then((boards) => {
        const finalPins = [];
        pins.forEach((pin) => {
          const newPin = { ...pin };
          const boardsRecord = boards.find((x) => x.id === pins.boardID);
          newPin.boardsRecord = boardsRecord;
          finalPins.push(newPin);
          console.log(finalPins);
        });
        resolve(finalPins);
      });
    })
    .catch((error) => reject(error));
});

export default { getCompleteBoard };
