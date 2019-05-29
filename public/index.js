//=====Create bill Button=====
var createbillButton = document.getElementById('create-bill-button');

function createbillClickListener(event) {
  var modalBackdrop = document.getElementById('modal-backdrop');
  modalBackdrop.classList.remove('hidden');

  var createbillModal = document.getElementById('create-bill-modal');
  createbillModal.classList.remove('hidden');
}

createbillButton.addEventListener('click', createbillClickListener);

//=====Hide Modal=====
function hideModal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  modalBackdrop.classList.add('hidden');

  var createbillModal = document.getElementById('create-bill-modal');
  createbillModal.classList.add('hidden');
}

//=====Close Modal Button=====
var closeModalButton = document.getElementsByClassName('modal-close-button')[0];

function closeModalButtonClickListener(event) {
  hideModal();
  clearInput();
}
closeModalButton.addEventListener('click', closeModalButtonClickListener);

//=====Cancel Modal Button=====
var cancelModalButton = document.getElementsByClassName('modal-cancel-button')[0];

function cancelModalButtonClickListener(event) {
  hideModal();
  clearInput();
}
cancelModalButton.addEventListener('click', cancelModalButtonClickListener);

//=====Accept bill Button=====
var acceptbillButton = document.getElementsByClassName('modal-accept-button')[0];

function acceptbillButtonClickListener(event) {
  if(!billAlert()) {
    var bill = createNewbillElement();
    document.getElementsByClassName('bill-container')[0].appendChild(bill);
    hideModal();
    clearInput();
  }
}

acceptbillButton.addEventListener('click', acceptbillButtonClickListener);

//build new bill
function createNewbillElement() {
  var newbill = document.createElement('article');
  newbill.classList.add('bill');

  var text0 = document.createElement('text');
  var text2 = document.createElement('text');
  var text4 = document.createElement('text');
  newbill.appendChild(text0);

  var icontext0 = document.createElement('text');
  var icontext2 = document.createElement('text');

  var billIconDiv = document.createElement('div');
  var billIcon = document.createElement('i');
  billIconDiv.classList.add('bill-icon');
  billIcon.classList.add('fa');
  billIcon.classList.add('fa-file-invoice-dollar');
  billIconDiv.appendChild(icontext0);
  billIconDiv.appendChild(billIcon);
  billIconDiv.appendChild(icontext2);
  newbill.appendChild(billIconDiv);
  newbill.appendChild(text2);

  var contenttext0 = document.createElement('text');
  var contenttext2 = document.createElement('text');
  var contenttext4 = document.createElement('text');

  var billContentDiv = document.createElement('div');
  var billText = document.createElement('p');
  var billAuthor = document.createElement('p');
  var billAuthorLink = document.createElement('a');
  billContentDiv.classList.add('bill-content');
  billText.classList.add('bill-text');
  billAuthor.classList.add('bill-author');
  billAuthorLink.href = "#";
  billText.textContent = document.querySelector('textarea#bill-text-input').value;
  billAuthorLink.textContent = document.querySelector('input#bill-attribution-input').value;
  billAuthor.appendChild(billAuthorLink);
  billContentDiv.appendChild(contenttext0);
  billContentDiv.appendChild(billText);
  billContentDiv.appendChild(contenttext2);
  billContentDiv.appendChild(billAuthor);
  billContentDiv.appendChild(contenttext4);

  newbill.appendChild(billContentDiv);

  newbill.appendChild(text4);

  return newbill;
}

//=====Erase Input=====
function clearInput() {
  var billTextInput = document.querySelector('textarea#bill-text-input');
  billTextInput.value = '';

  var billAInput = document.querySelector('input#bill-attribution-input');
  billAInput.value = '';
}

//=====Check bill Entry=====
function billAlert() {
  var billTextInput = document.querySelector('textarea#bill-text-input');
  var billAInput = document.querySelector('input#bill-attribution-input');

  if(!billTextInput.value || !billAInput.value) {
    window.alert('Please fill out the bill text and bill author fields.');
    return true;
  }
  return false;
}

//=====Search=====
function searchClickListener(event) {
  var searchInput = document.getElementById('navbar-search-input').value;
  searchInput = searchInput.toLowerCase();
  //console.log("search input: " + searchInput);

  var allbills = document.getElementsByClassName('bill');
  //console.log(allbills);
  var current = 0;
  for(var i = allbills.length-1; i >= 0; i--) {
    //console.log('i: ', i);
    //console.log(allbills[i].childNodes[3]);
    var text = allbills[i].childNodes[3].childNodes[1].textContent.toLowerCase();
    var author = allbills[i].childNodes[3].childNodes[3].textContent.toLowerCase();
    //console.log("text: " + text);
    //console.log("author: " + author);
    //console.log("text search: " + text.search(searchInput));
    if((text.search(searchInput) == -1) && (author.search(searchInput) == -1)) {
      //console.log("removing child: ", allbills[i]);
      allbills[i].remove();

    }
  }

}

var searchButton = document.getElementById('navbar-search-button');
searchButton.addEventListener('click', searchClickListener);



//Your Page

function yourPageListener(event) {

}

var yourPage = document.getElementsByClassName('yourpage')[0];
console.log(yourPage);
