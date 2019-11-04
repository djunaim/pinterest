const makeAPin = (board) => {
  let domString = '';
  if (board.board.id === 'board1') {
    domString += `
    <div class="card col-4">
      <img src=${board.imageURL} class="card-img-top" alt="...">
    </div>
    `;
  }
  return domString;
};

export default { makeAPin };
