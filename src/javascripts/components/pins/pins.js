import 'bootstrap';

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
        <button type="button" id="pin-${pin.id}" class="btn btn-primary updatePinButton" data-toggle="modal" data-target="#updatePinModal">
          Update Pin
        </button>

        <!-- Modal -->
        <div class="modal fade" id="updatePinModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <form>
              <div class="form-group">
                <label for="pinType">Type</label>
                <input type="text" class="form-control" id="pinType" placeholder="Enter Name">
              </div>
            </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary updatePin" id="updatePin-${pin.id}">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
  return domString;
};

export default { makeAPin };
