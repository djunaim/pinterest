const makeABoard = (board) => {
  let domString = '';
  if (board.id) {
    domString += `
    <div class="card col-4 boardCard" id="${board.id}">
      <p>${board.type}</p>
      <button href="#" class="btn btn-danger deleteBoard" id="board-${board.id}">Delete</button>
    </div>
    `;
  }
  return domString;
};

export default { makeABoard };
