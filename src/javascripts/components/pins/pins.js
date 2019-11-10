const makeAPin = (pin) => {
  let domString = '';
  if (pin.id) {
    domString += `
    <div class="card col"> 
    <img src="${pin.imageURL}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${pin.siteURL}</h5>
        <p class="card-text">${pin.description}</p>
        <button href="#" class="btn btn-danger deletePin" id="${pin.id}" databoardid="${pin.boardID}">Delete</button>
        <button type="button" id="updatePinButton" class="btn btn-primary" data-toggle="modal" data-target="#updatePinModal">Update Pin</button> 
      </div>
    </div>
    `;
  }
  return domString;
};

export default { makeAPin };
