const makeAPin = (board) => {
  let domString = '';
  if (board.description) {
    domString += `
    <div class="card col-4">
      <img src=${board.pin.imageURL} class="card-img-top" alt="...">
    </div>
    `;
  }
  return domString;
};

export default { makeAPin };
