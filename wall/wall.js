var PAGE_DATA = {};

//------------------------------------------------- FOR PERSONAL INFORMATION ----------------------------------------//
function visualizePersonalInfo() {
    var user = PAGE_DATA.chirper;
    var htmlData = '<h2><a> ' + user.name + ' </a></h2>';
    htmlData += '<a> ' + user.username + ' </a>';

    $('#personal-block').append(htmlData);
}

//------------------------------------------------ END OF PERSONAL INFORMATION --------------------------------------//
//----------------------------------------------- VISUALIZE CHIRPS --------------------------------------------------//
function chirps(chirp) {
    var html =
        '<div class="head"><h3>' +
        '<img id="user_pic" src="../../../Pictures/bench.jpg">' +
        '<strong>' +
        chirp.author.name +
        '</strong>' +
        '<i id="user_username">' +
        ' @' +
        chirp.author.username +
        ' ' +
        '</i>' +
        '<i id="user_date">' +
        chirp.date.month +
        '/' +
        chirp.date.day +
        '/' +
        chirp.date.year +
        '</i>' +
        '</h3></div>';
    html += '<div class="feed"><p>' + chirp.message + '</p></div>';
    return html;
}

function visualizeChirps() {
    var html = PAGE_DATA.chirps.map(function(chirp) {
        return chirps(chirp);
    });
    $('#chirps').append(html);
}

//----------------------------------------------- END OF VISUALIZE CHIRPS -------------------------------------------//
//------------------------------------------------- MONTH HELPER FUNCTION! ------------------------------------------//
function monthyByNumber(i) {
    var months = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'Sptember',
        10: 'October',
        11: 'November',
        12: 'December'
    };
    return months[String(i)];
}

//------------------------------------------------------- END OF MONTH HELPER FUNCTION ------------------------------------//

function draw() {
    visualizePersonalInfo();
}

function main() {
    var url = new URL(location);
    var username = url.searchParams.get('username');
    $('#chirps').html(
        '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
    );

    $.get('https://bcca-chirper.herokuapp.com/api/' + username + '/')
        .then(function handleFeedResponse(response) {
            console.log(response);
            PAGE_DATA = response;
            draw();
        })
        .catch(function handleFeedReason(reason) {
            console.log('Failure:', reason);
        });
}

$(main);
