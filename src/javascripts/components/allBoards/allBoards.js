import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './allBoards.scss';
import utilities from '../../helpers/utilities';
import boardsPrint from '../boards/boards';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import pinsPrint from '../pins/pins';

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

const updatePin = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const pinID = e.target.id.split('updatePin-')[1];
  const boardID = $('input[name=boardRadios]:checked').val();
  pinsData.getPin(pinID, boardID)
    .then(() => {
      $('#updatePinModal').modal('hide');
    });
  // eslint-disable-next-line no-use-before-define
  buildAllBoard(uid);
};

const updatePinHandler = (e) => {
  const pinID = e.target.id.split('pin-')[1];
  $('.saveUpdatePinButton').attr('id', `updatePin-${pinID}`);
};

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
      let domString = '<div id="boardSection" class="container"><span><button class="closeButton">x</button><span>';
      pins.forEach((pin) => {
        domString += pinsPrint.makeAPin(pin);
        $('#newBoardButton').addClass('hide');
        $('#newPinButton').removeClass('hide');
      });
      domString += '</div>';
      utilities.printToDOM('printBoard', domString);
      $('#addNewPin').attr('storeBoardID', boardID);
      $('#boardSection').on('click', '.closeButton', close);
      $('.updatePinButton').click(updatePinHandler);
      $('#updatePinModal').on('click', '.saveUpdatePinButton', updatePin);
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
    imageURL: $('#boardImageURL').val(),
    type: $('#boardType').val(),
    private: $('#privacy:checkbox:checked').length > 0,
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
      let domString = '<div id="boardSection" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardsPrint.makeABoard(board);
      });
      let domString2 = '<div>';
      boards.forEach((board) => {
        domString2 += boardsPrint.boardRadioOptions(board);
      });
      domString += '</div>';
      domString2 += '</div>';
      utilities.printToDOM('printBoard', domString);
      utilities.printToDOM('updatePinBoard', domString2);
      $(document).on('click', '.boardCard', showSingleBoardEventHandler);
      $(document).on('click', '.deletePin', (e) => deletePin(e));
      $(document).on('click', '.deleteBoard', deleteBoard);
      $('#addNewBoard').click(addNewBoard);
      $('#addNewPin').click(addNewPin);
      $('#newPinButton').addClass('hide');
    })
    .catch((error) => console.error(error));
};

export default { buildAllBoard };
