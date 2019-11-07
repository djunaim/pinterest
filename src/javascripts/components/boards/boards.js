const makeABoard = (board) => {
  let domString = '';
  if (board.id) {
    domString += `
    <div class="card col-4 boardCard" id="${board.id}">
      <p>${board.description}</p>
      <button href="#" class="btn btn-primary deleteBoard">Delete</button>
    </div>
    `;
  }
  return domString;
};

export default { makeABoard };
