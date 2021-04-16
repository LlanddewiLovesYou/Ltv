// move document.ready to global code.
$(document).ready(function () { // arrow function? if not babel

    // event listener - make request on click
    $("#btn-search").on("click", function (e) {
      e.preventDefault();
      localStorage.clear();

      // vaidate email - break out in separate function
      email = $('input[type="text"]').val().toLowerCase(); // get the user inputted email address

      var x, y; // bad variable names. x => validEmail, y is unused
      regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(regEx)) {
        x = true;
      } else {
        x = false;
      }

      if (x === true) {
        document.querySelector('input[type="text"]').parentNode.classList.remove("error");// valid email removes error class
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email; // BREAK OUT INTO CONSTANT
        fetch(proxyurl + url) // fetch response, put in local storage, history push to result html
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('input[type="text"]').parentNode.classList.add("error"); // adds error class for invalid email
      }
    });

    // event listener - make request on keypress enter
    $('input[type="text"]').keypress(function (event) {

      // validate email
      email = $('input[type="text"]').val().toLowerCase();
      regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(regEx)) {
        x = true;
        document.querySelector('input[type="text"]').parentNode.classList.remove("error"); // removeErrorClass - break out into separate function
      } else {
        x = false;
      }
      keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13') { // break out into constant ENTER_KEY
        event.preventDefault();
        // pull from above after breaking out into a separate function
        localStorage.clear(); //Clears storage for next request

        var x, y;


        if (x === true) {
          const proxyurl = "";
          const url =
            'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
          fetch(proxyurl + url)
            .then((response) => response.text())
            .then(function (contents) {
              localStorage.setItem("userObject", contents);
              window.location.href = "result.html";
            })
            .catch((e) => console.log(e));
        } else if (x !== true) {
          document.querySelector('input[type="text"]').parentNode.classList.add("error"); // addErrorClass - break into separate function
        }
      }
    });

  });
