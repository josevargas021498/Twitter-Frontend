// -------------------------DISPLAY SIGN-UP FORM! -----------------------------------------------------------//
$('#sign-up-btn').on('click', function() {
    $('.sign-up-form').show(500);
});
// -------------------------END OF DISPLAY SIGN-UP FORM! ------------------------------------------------------------//
function signUpFirstNameLengthCheck() {
    $('#sign-up-firstname').on('input', function() {
        var firstName = $('#sign-up-firstname').val();

        if (firstName.length === 0 || firstName.length > 10) {
            console.log(firstName);
            $('#sign-up-firstname').addClass('error');
            return;
        }
        $('#sign-up-firstname').removeClass('error');
    });
}
function signUpFirstNameHasNumbers() {
    $('#sign-up-firstname').on('input', function() {
        var firstName = $('#sign-up-firstname').val();
        var numbers = '1234567890';

        for (var i in numbers) {
            if (firstName.includes(numbers[i])) {
                console.log(firstName);
                $('#sign-up-firstname').addClass('error');
                return;
            }
            $('#sign-up-firstname').removeClass('error');
        }
    });
}

//SIGN-UP LAST NAME//
function signUpLastNameLengthCheck() {
    $('#sign-up-lastname').on('input', function() {
        var lastName = $('#sign-up-lastname').val();

        if (lastName.length === 0 || lastName.length > 16) {
            console.log(lastName);
            $('#sulastname').addClass('error');
            return;
        }
        $('#sulastname').removeClass('error');
    });
}
function signUpLastNameHasNumbers() {
    $('#sign-up-lastname').on('input', function() {
        var firstName = $('#sign-up-lastname').val();
        var numbers = '1234567890';

        for (var i in numbers) {
            if (firstName.includes(numbers[i])) {
                console.log(lastName);
                $('#sign-up-lastname').addClass('error');
                return;
            }
            $('#sign-up-lastname').removeClass('error');
        }
    });
}

//SIGN-UP E-MAIL//
function signUpEmailLengthCheck() {
    $('#sign-up-email').on('input', function() {
        var email = $('#sign-up-email').val();

        if (email.length === 0) {
            console.log(email);
            $('#sign-up-email').addClass('error');
            return;
        }
        $('#sign-up-email').addClass('error');
    });
}
function signUpEmailHasProperties() {
    $('#sign-up-email').on('input', function() {
        var email = $('#sign-up-email').val();

        if (!(email.includes('@') && email.includes('.com'))) {
            console.log(email);
            $('#sign-up-email').addClass('error');
            return;
        }
        $('#sign-up-email').removeClass('error');
    });
}

//SIGN-UP USERNAME//
function signUpUserNameLengthCheck() {
    $('#sign-up-username').on('input', function() {
        var userNameValue = $('#sign-up-username').val();

        if (userNameValue.length === 0) {
            console.log(userNameValue);
            $('#sign-up-username').addClass('error');
            return;
        }
        $('#sign-up-username').removeClass('error');
    });
}

//SIGN-UP PASSWORD//
function signUpPasswordLengthCheck() {
    $('#sign-up-password').on('input', function() {
        var passWordValue = $('#sign-up-password').val();

        if (!(passWordValue.length < 6 || passWordValue.length > 16)) {
            console.log(passWordValue);
            $('#sign-up-password').addClass('error');
            return;
        }
        $('#sign-up-password').removeClass('error');
    });
}
// -------------------------END ___OF___ EVALUATE SIGN-UP CONDITIONS! ------------------------------------------------------------//
//--------------------------------------------- POST TO SERVER ---------------------------------------------------------------------//
function postSignUpToServer() {
    $('#sign-up-submit-btn').on('click', function() {
        $.post(
            'https://bcca-chirper.herokuapp.com/api/signup/',
            JSON.stringify({
                name:
                    $('#sign-up-firstname').val() +
                    $('#sign-up-lastname').val(),
                email: $('#sign-up-email').val(),
                username: $('#sign-up-username').val(),
                password: $('#sign-up-password').val()
            })
        )
            .then(function successfulSignup(data) {
                console.log(data);
                localStorage.setItem('key', data.key);
                window.location =
                    '../wall/wall.html?username=' +
                    $('#sign-up-username').val();
            })
            .catch(function unsuccessfulSignup(response) {
                console.log(response.status);
                console.log(response.responseJSON);
            });
    });
}

// ---------------------------------------------- END OF POST TO SERVER ----------------------------------------------------------//

function postLoginToServer() {
    const server = 'https://bcca-chirper.herokuapp.com/api/login/';

    $('#log-in-btn').on('click', function() {
        $.post(
            server,
            JSON.stringify({
                username: $('#log-in-username').val(),
                password: $('#log-in-password').val()
            })
        )
            .then(function successfulLogIn(data) {
                console.log(data);
                window.localStorage.setItem('key', data.key);
                window.location =
                    '../wall/wall.html?username=' + $('#log-in-username').val();
            })
            .catch(function unsuccessfulLogIn(response) {
                console.log(response.status);
                console.log(response.responseJSON);
            });
    });
}
//-------------------------MAIN() -------------------------------------------------------------//

function main() {
    signUpFirstNameLengthCheck();
    signUpFirstNameHasNumbers();
    signUpLastNameLengthCheck();
    signUpLastNameHasNumbers();
    signUpEmailLengthCheck();
    signUpEmailHasProperties();
    signUpUserNameLengthCheck();
    signUpPasswordLengthCheck();
    postSignUpToServer();
    postLoginToServer();
}

$(main);
