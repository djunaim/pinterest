const makeAPin = (pin) => {
  let domString = '';
  if (pin.id) {
    domString += `
    <div class="card col"> 
    <img src="${pin.imageURL}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${pin.siteURL}</h5>
        <p class="card-text">${pin.description}</p>
        <button href="#" class="btn btn-primary deletePin" id="${pin.id}">Delete</button>
      </div>
    </div>
    `;
  }
  return domString;
};

export default { makeAPin };
