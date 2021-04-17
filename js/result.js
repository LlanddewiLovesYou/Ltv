const NO_RESULTS_MESSAGE = "Try starting a new search below"
const RESULTS_FOUND_MESSAGE = "Look at the result below to see the details of the person you’re searched for."

function retriveUserObjectFromLocalStorage() {
  var user_object = localStorage.getItem('userObject');
  return JSON.parse(user_object);
}

function userObjectNotFound(user) {
  return JSON.stringify(user) === '[]'
}

function displayNoResults() {
  $('#result-count').text("0 Results");
  $("#result-subtext").text(
    `${NO_RESULTS_MESSAGE}`
  );
}

function formatPhoneNumber(phoneNumber) {
  return `(${phoneNumber.substring(0, 3)})${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, 10)}`;
}

function addPhoneNumbersToDom(user) {
  for (const phone_number in user.phone_numbers) {
    const phoneNumber = user.phone_numbers[phone_number]
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber)
    $(".phone-num").append(
      `<a href="tel:${phoneNumber}">${formattedPhoneNumber}</a>`
    );
  }
}

function addRelativesToDom(user) {
  for (const relative in user.relatives) {
    $(".relatives").append(
      `<p>${user.relatives[relative]}</p>`
    );
  }
}

function displayResults(user) {
  // NOTE: I have changed all querys to use ids when there is only one instance of them
  // I am querying by class when there COULD be more than one element on the page
  // even though only one result ever gets returned at present.
  $('#result-count').text("1 Result");// TODO: write determineResultsCount function to allow for more than one result to be returned.
  $("#result-subtext").html(`${RESULTS_FOUND_MESSAGE}`);
  $(".name").text(
    `${user.first_name} ${user.last_name}`
  );
  $('.user-description').text(user.description);
  $(".address").text(user.address);
  $(".email").text(user.email);

  addPhoneNumbersToDom(user)
  addRelativesToDom(user)

  $("#result-wrap").show();
}

function retrieveAndDisplayUserInfo() {
  const user = retriveUserObjectFromLocalStorage()
  if (user) {
    if (userObjectNotFound(user)) {
      displayNoResults()
    } else {
      displayResults(user)
    }
  }
}

$(document).ready(function () {
  retrieveAndDisplayUserInfo()
});
