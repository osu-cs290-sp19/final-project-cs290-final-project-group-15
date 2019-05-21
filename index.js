//=====Create Twit Button=====
var createTwitButton = document.getElementById('create-twit-button');

function createTwitClickListener(event) {
  var modalBackdrop = document.getElementById('modal-backdrop');
  modalBackdrop.classList.remove('hidden');

  var createTwitModal = document.getElementById('create-twit-modal');
  createTwitModal.classList.remove('hidden');
}

createTwitButton.addEventListener('click', createTwitClickListener);

//=====Hide Modal=====
function hideModal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  modalBackdrop.classList.add('hidden');

  var createTwitModal = document.getElementById('create-twit-modal');
  createTwitModal.classList.add('hidden');
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

//=====Accept Twit Button=====
var acceptTwitButton = document.getElementsByClassName('modal-accept-button')[0];

function acceptTwitButtonClickListener(event) {
  if(!twitAlert()) {
    var twit = createNewTwitElement();
    document.getElementsByClassName('twit-container')[0].appendChild(twit);
    hideModal();
    clearInput();
  }
}

acceptTwitButton.addEventListener('click', acceptTwitButtonClickListener);

//build new twit
function createNewTwitElement() {
  var newTwit = document.createElement('article');
  newTwit.classList.add('twit');

  var text0 = document.createElement('text');
  var text2 = document.createElement('text');
  var text4 = document.createElement('text');
  newTwit.appendChild(text0);

  var icontext0 = document.createElement('text');
  var icontext2 = document.createElement('text');

  var twitIconDiv = document.createElement('div');
  var twitIcon = document.createElement('i');
  twitIconDiv.classList.add('twit-icon');
  twitIcon.classList.add('fa');
  twitIcon.classList.add('fa-bullhorn');
  twitIconDiv.appendChild(icontext0);
  twitIconDiv.appendChild(twitIcon);
  twitIconDiv.appendChild(icontext2);
  newTwit.appendChild(twitIconDiv);
  newTwit.appendChild(text2);

  var contenttext0 = document.createElement('text');
  var contenttext2 = document.createElement('text');
  var contenttext4 = document.createElement('text');

  var twitContentDiv = document.createElement('div');
  var twitText = document.createElement('p');
  var twitAuthor = document.createElement('p');
  var twitAuthorLink = document.createElement('a');
  twitContentDiv.classList.add('twit-content');
  twitText.classList.add('twit-text');
  twitAuthor.classList.add('twit-author');
  twitAuthorLink.href = "#";
  twitText.textContent = document.querySelector('textarea#twit-text-input').value;
  twitAuthorLink.textContent = document.querySelector('input#twit-attribution-input').value;
  twitAuthor.appendChild(twitAuthorLink);
  twitContentDiv.appendChild(contenttext0);
  twitContentDiv.appendChild(twitText);
  twitContentDiv.appendChild(contenttext2);
  twitContentDiv.appendChild(twitAuthor);
  twitContentDiv.appendChild(contenttext4);

  newTwit.appendChild(twitContentDiv);

  newTwit.appendChild(text4);

  return newTwit;
}

//=====Erase Input=====
function clearInput() {
  var twitTextInput = document.querySelector('textarea#twit-text-input');
  twitTextInput.value = '';

  var twitAInput = document.querySelector('input#twit-attribution-input');
  twitAInput.value = '';
}

//=====Check Twit Entry=====
function twitAlert() {
  var twitTextInput = document.querySelector('textarea#twit-text-input');
  var twitAInput = document.querySelector('input#twit-attribution-input');

  if(!twitTextInput.value || !twitAInput.value) {
    window.alert('Please fill out the twit text and twit author fields.');
    return true;
  }
  return false;
}

//=====Search=====
function searchClickListener(event) {
  var searchInput = document.getElementById('navbar-search-input').value;
  searchInput = searchInput.toLowerCase();
  //console.log("search input: " + searchInput);

  var allTwits = document.getElementsByClassName('twit');
  //console.log(allTwits);
  var current = 0;
  for(var i = allTwits.length-1; i >= 0; i--) {
    //console.log('i: ', i);
    //console.log(allTwits[i].childNodes[3]);
    var text = allTwits[i].childNodes[3].childNodes[1].textContent.toLowerCase();
    var author = allTwits[i].childNodes[3].childNodes[3].textContent.toLowerCase();
    //console.log("text: " + text);
    //console.log("author: " + author);
    //console.log("text search: " + text.search(searchInput));
    if((text.search(searchInput) == -1) && (author.search(searchInput) == -1)) {
      //console.log("removing child: ", allTwits[i]);
      allTwits[i].remove();

    }
  }

}

var searchButton = document.getElementById('navbar-search-button');
searchButton.addEventListener('click', searchClickListener);

