import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserBoardPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userBoardPins.json`)
    .then((response) => {
      const demUserBoardPins = response.data;
      const userBoardPins = [];
      Object.keys(demUserBoardPins).forEach((fbId) => {
        demUserBoardPins[fbId].id = fbId;
        userBoardPins.push(demUserBoardPins[fbId]);
      });
      resolve(userBoardPins);
    })
    .catch((error) => reject(error));
});

export default { getUserBoardPins };
