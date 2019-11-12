import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './allBoards.scss';
import utilities from '../../helpers/utilities';
import boardsPrint from '../boards/boards';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import pinsPrint from '../pins/pins';
// import singleBoard from '../singleBoard/singleBoard';
// import smash from '../../helpers/data/smash';

const deletePin = (e) => {
  e.preventDefault();
  pinsData.deletePin(e.target.id)
    .then(() => {
      const boardID = e.target.getAttribute('databoardid');
      // eslint-disable-next-line no-use-before-define
      showSingleBoard(boardID);
    })
    .catch((error) => console.error(error));
};

const addNewPin = (e) => {
  e.stopImmediatePropagation();
  const boardID = e.target.getAttribute('storeBoardID');
  const newPin = {
    imageURL: $('#pinImageURL').val(),
    siteURL: $('#pinSiteURL').val(),
    description: $('#pinDescription').val(),
    boardID,
  };
  pinsData.addPin(newPin)
    .then(() => {
      $('#pinModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      showSingleBoard(boardID);
    })
    .catch((error) => console.error(error));
};

const updatePin = (pinID) => {
  console.log('from update pin', pinID);
  const { uid } = firebase.auth().currentUser;
  const inputText = $('#pinType').val();
  // console.log(inputText);
  boardsData.getBoardByUid(uid)
    .then((boards) => {
      const selectedBoard = boards.find((x) => x.type.toLowerCase() === inputText.toLowerCase());
      // figure out toLowercase()
      console.log('selected board', selectedBoard.type, inputText);
      if (selectedBoard.type.toLowerCase() === inputText) {
        pinsData.getPin(pinID).then(() => {
          const newPin = {
            boardID: selectedBoard.id,
          };
          console.log('new pin', newPin);
          pinsData.updateNewPin(newPin).then(() => {
            // eslint-disable-next-line no-use-before-define
            showSingleBoard(selectedBoard.id);
          });
        });
      }
    })
    .catch((error) => console.error(error));
};

const updatePinEventListener = (e) => {
  // e.stopImmediatePropagation();
  const pinID = e.target.id.split('pin-')[1];
  console.log('pin id', pinID);
  updatePin(pinID);
};

// const updatePin = (e) => {
//   e.stopImmediatePropagation();
//   // const { uid } = firebase.auth().currentUser;
//   const inputText = $('#pinType').val();
//   console.log(inputText);
//   smash.getCompleteBoard()
//     .then((complete) => console.log('smash', complete))
//     .catch((error) => console.error(error));
// };

const close = () => {
  const { uid } = firebase.auth().currentUser;
  $(document).click((e) => {
    const buttonName = e.target.className;
    if (buttonName === 'closeButton') {
      // eslint-disable-next-line no-use-before-define
      buildAllBoard(uid);
      $('#newBoardButton').removeClass('hide');
      $('#newPinButton').addClass('hide');
    }
  });
};

const showSingleBoard = (boardID) => {
  pinsData.getPinsByBoardId(boardID)
    .then((pins) => {
      // console.log('here are the pins', pins);
      let domString = '<div id="boardSection" class="d-flex flex-wrap container"><span><button class="closeButton">x</button><span>';
      pins.forEach((pin) => {
        domString += pinsPrint.makeAPin(pin);
        $('#newBoardButton').addClass('hide');
        $('#newPinButton').removeClass('hide');
      });
      domString += '</div>';
      utilities.printToDOM('printBoard', domString);
      $('#addNewPin').attr('storeBoardID', boardID);
      $('#boardSection').on('click', '.closeButton', close);
      $('.updatePinButton').click(updatePinEventListener);
      $('#updatePin').click(updatePinEventListener);
      $('#newPinButton').removeClass('hide');
    })
    .catch((error) => console.error(error));
};

const showSingleBoardEventHandler = (e) => {
  const boardID = e.target.id;
  showSingleBoard(boardID);
};

const deleteBoard = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  const boardID = e.target.id.split('board-')[1];
  console.log(boardID);
  boardsData.deleteBoard(boardID)
    .then(() => {
      pinsData.getPinsByBoardId(boardID).then((pins) => {
        pins.forEach((pin) => pinsData.deletePin(pin.id));
      });
      // eslint-disable-next-line no-use-before-define
      buildAllBoard(uid);
    })
    .catch((error) => console.error(error));
};

const addNewBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    type: $('#boardType').val(),
    private: console.log($('#privacy:checkbox:checked').length > 0),
    uid,
    description: $('#boardDescription').val(),
  };
  boardsData.addBoard(newBoard)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllBoard(uid);
    })
    .catch((error) => console.error(error));
};

const buildAllBoard = (uid) => {
  boardsData.getBoardByUid(uid)
    .then((boards) => {
      // console.log('here are the boards', boards);
      let domString = '<div id="boardSection" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardsPrint.makeABoard(board);
      });
      domString += '</div>';
      utilities.printToDOM('printBoard', domString);
      $('#boards').on('click', '.boardCard', showSingleBoardEventHandler);
      $('#boards').on('click', '.deletePin', (e) => deletePin(e));
      $('#boards').on('click', '.deleteBoard', deleteBoard);
      $('#addNewBoard').click(addNewBoard);
      $('#addNewPin').click(addNewPin);
      $('#newPinButton').addClass('hide');
    })
    .catch((error) => console.error(error));
};

export default { buildAllBoard };
