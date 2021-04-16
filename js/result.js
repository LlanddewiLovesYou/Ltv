$(document).ready(function () {
    /**
     * Gets an object and sets its content into the result card in the result page
     * If there's no content in the JSON object, makes sure to tell the user
     */
    if (window.localStorage) { // get rid of this
      if (localStorage.userObject) {
        //retriveUserObject()
        var user_object = localStorage.getItem('userObject');// this can be a check in and of itself istead of nested ifs, get rid of nested ifs for sure
        retreivedObject = JSON.parse(user_object); //parses the retrieved object into an JSON object
        if (JSON.stringify(retreivedObject) == "[]") {
          //displayNoResults()
          $('#result-count').text("0 Results"); // determineResultCount()
          $(".result-desc").text( // should be #result-desc
            "Try starting a new search below" // CONSTANT
          );
        } else {
          //displayResults()
          $('#result-count').text("1 Result");
          $("#result-subtext").html("Look at the result below to see the details of the person you’re searched for."); // CONSTANT
          $(".name").append(
            retreivedObject.first_name + " " + retreivedObject.last_name
          );
          $('.user-description').append(retreivedObject.description);
          $("#address").append("<p>" + retreivedObject.address + '</p>'); // should be .address
          $(".email").append("<p>" + retreivedObject.email + "</p>");

          for (const phone_number in retreivedObject.phone_numbers) {
            phone = retreivedObject.phone_numbers[phone_number]
            formatted_phone = "(" + phone.substring(0, 3) + ") " + phone.substring(3, 6) + "-" + phone.substring(6, 10);// formatPhoneNumber()
            // addPhoneNumberToDom()
            $(".phone-num").append(
              "<a href=" + `tel:${phone}` + " style='display: block;color: #004A80;'>" + `${formatted_phone}` + "</a>"
            );
          }

          for (const relative in retreivedObject.relatives) {
            //addRelativeToDom()
            $(".relatives").append(
              "<p style='margin-bottom: 0'>" + `${retreivedObject.relatives[relative]}` + "</p>"
            );
          }

          $(".result-wrap").show();
        }
      }
    }
  });
