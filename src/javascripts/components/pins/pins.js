const makeAPin = (board) => {
  let domString = '';
  if (board.id) {
    domString += `
    <div class="card col-4">
      <p>${board.description}</p>
    </div>
    `;
  }
  return domString;
};

export default { makeAPin };
