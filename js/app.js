const LTV_API_BASE_URL = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email='
const EMAIL_VALIDATION_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const ENTER_KEY_CODE = '13'

function initFunction(e) {
  e.preventDefault();
  localStorage.clear();
}

function getEmailFromInput() {
  return $('#search-input').val().toLowerCase();
}

function validateEmail(regEx) {
  if (getEmailFromInput().match(regEx)) {
    return true;
  }
  return false
}

function addErrorClass() {
  document.querySelector('.input-group').classList.add("error");
}

function removeErrorClass() {
  document.querySelector('.input-group').classList.remove("error");
}

// I'm sure there's a better name for this if I had more context
function callLtvApi(proxyUrl) {
  const proxy = proxyUrl || ''
  const url = LTV_API_BASE_URL + getEmailFromInput()
  fetch(proxy + url)
    .then((response) => response.text())
    .then(function (contents) {
      localStorage.setItem("userObject", contents);
      window.location.href = "result.html";
    })
    .catch((e) => console.log(e));
}

function addClickListenerToButton () {
  $("#btn-search").on("click", function (e) {
    initFunction(e)
    const validEmail = validateEmail(EMAIL_VALIDATION_REGEX)
    if (validEmail) {
      removeErrorClass()
      callLtvApi()
    } else {
       addErrorClass()
    }
  });
}

function addKeypressListenerToEnter() {
  $('#search-input').keypress(function (event) {
    keycode = event.keyCode || event.which;

    if (keycode == ENTER_KEY_CODE) {
      initFunction()
      const validEmail = validateEmail(EMAIL_VALIDATION_REGEX)

      if (validEmail) {
        removeErrorClass()
        callLtvApi()
      } else {
        addErrorClass()
      }
    }
  });
}


$(document).ready(function () {
 addClickListenerToButton()
 addKeypressListenerToEnter()
});
