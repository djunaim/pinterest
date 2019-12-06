import './boards.scss';

const boardRadioOptions = (board) => {
//  pass board through
//  create domString to build radio button options
  let domString2 = '';
  if (board.id) {
    domString2 += `
    <div class="form-check">
      <input class="form-check-input" type="radio" name="boardRadios" value=${board.id}>
      <label class="form-check-label" for="exampleRadios2">
        ${board.type}
      </label>
    </div>
    `;
  }
  return domString2;
};

const makeABoard = (board) => {
  let domString = '';
  if (board.id) {
    domString += `
    <div class="card col-md-4 boardCard stretched-link" id="${board.id}">
    <img src="${board.imageURL}" class="card-img-top" alt="...">
      <p id="boardDescription">${board.type}</p>
      <button href="#" class="btn btn-danger deleteBoard" id="board-${board.id}">Delete</button>
    </div>
    `;
  }
  return domString;
};

export default { makeABoard, boardRadioOptions };
