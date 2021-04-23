const LTV_API_BASE_EMAIL_URL = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email='
const LTV_API_BASE_PHONE_URL = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?phone='
const EMAIL_VALIDATION_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const searchState = new SearchState()

function initFunction(e) {
  e.preventDefault();
  localStorage.clear();
}

function getEmailFromInput() {
  return $('#search-input').val().toLowerCase();
}

function getPhoneNumberFromInput() {
  return $('#search-input').val()
}

function validatePhoneNumber() {
  const characters = getPhoneNumberFromInput().split('')
  const hasLetters = characters.some(char => isNaN(char))
  if (hasLetters || characters.length !== 10) {
    return false
  }
  return true
}

function validateEmail(regEx) {
  if (getEmailFromInput().match(regEx)) {
    return true;
  }
  return false
}

function addErrorClass(searchType) {
  document.querySelector('.input-group').classList.add("error");
  document.querySelector('#input-error').innerHTML = `Please enter a valid ${searchType}`
}

function removeErrorClass() {
  document.querySelector('.input-group').classList.remove("error");
}

function renderLoadingSpinner() {
  const aboveTheFold = $('#above-the-fold')
  const features = $('#features')
  const loadingSpinner = $('#loading-spinner')

  aboveTheFold.remove()
  features.remove()
  loadingSpinner.show()
}

function callSearchApi(proxyUrl) {
  const proxy = proxyUrl || ''
  const url = searchState.get('email-button') ?
    LTV_API_BASE_EMAIL_URL + getEmailFromInput() :
    LTV_API_BASE_PHONE_URL + getPhoneNumberFromInput()
  renderLoadingSpinner()
  fetch(proxy + url)
  .then((response) => response.text())
  .then(function (contents) {
    localStorage.setItem("userObject", contents);
    window.location.href = "result.html";
  })
  .catch((e) => console.log(e));
}

function addClickListenerToSubmitButton () {
  $("#btn-search").on("click", function (e) {
    initFunction(e)
    const validEmail = validateEmail(EMAIL_VALIDATION_REGEX)
    const validPhone = validatePhoneNumber()
    if ((validEmail && searchState.get('email-button')) || (validPhone && searchState.get('phone-button'))) {
      removeErrorClass()
      callSearchApi()
    } else {
      searchState.get('email-button') ?
      addErrorClass("email address") :
      addErrorClass("phone number")
    }
  });
}

function addSelectedClass(buttonElement) {
  if (!buttonElement.classList.contains('selected')) {
    buttonElement.classList.add('selected')
  }
}

function updateInputPlaceholder() {
  const searchType = searchState.get('email-button') ?
    'N EMAIL ADDRESS' :
    ' PHONE NUMBER'
  $('#search-input').attr('placeholder', `ENTER A${searchType}`)
}

function addClickListenerToSearchButtons() {
  const buttons = $('.selector-button')

  buttons.on('click', function (e){
    e.preventDefault();
    buttons.removeClass('selected')
    searchState.set(e.target.id)
    removeErrorClass()
    addSelectedClass(e.target)
    updateInputPlaceholder()
  })
}


$(document).ready(function () {
 addClickListenerToSubmitButton()
 addClickListenerToSearchButtons()
});
