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

export default { getPinsByBoardId, deletePin };
