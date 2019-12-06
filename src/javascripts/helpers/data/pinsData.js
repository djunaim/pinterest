import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardID) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardID"&equalTo="${boardID}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((fbId) => {
        demPins[fbId].id = fbId;
        pins.push(demPins[fbId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});

const deletePin = (pinsID) => axios.delete(`${baseUrl}/pins/${pinsID}.json`);

const addPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const updateNewPin = (pinsID, newPinBoard) => axios.put(`${baseUrl}/pins/${pinsID}.json`, newPinBoard);

const getPin = (pinsID, newBoardID) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinsID}.json`)
    .then((result) => {
      const pinObject = result.data;
      pinObject.boardID = newBoardID;
      updateNewPin(pinsID, pinObject);
      resolve();
    })
    .catch((error) => reject(error));
});

export default {
  getPinsByBoardId,
  deletePin,
  addPin,
  getPin,
};
