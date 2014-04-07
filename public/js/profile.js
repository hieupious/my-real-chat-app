// profile.js

$(function(){

    var socket = io.connect('/socket');

    socket.on('connect', function(){
        var device = "desktop";
        if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
          device = "mobile";
        }

        var idchat = $("#idchat").val();
        socket.emit('online', { id: idchat, device: device});
    });

    socket.on('peopleonline', function(data){
        updatePeopleOnline(data);
    });

/*    socket.on('onchat', function(data){

    });
*/
    function updatePeopleOnline(data) {
        var idchat = $("#idchat").val();
        if (data) {
            $(".badge").text(data.number);
            var ptrContent = $(".pull-to-refresh-content");
            $.each(data.listclient, function(a, obj) {
                var linkHTML;
                var temp = $("#"+obj.user.idchat).length;
                if (!$("#"+obj.user.idchat).length) {
                    if(obj.user.idchat == idchat) {
                    linkHTML = '<li class="item-content" id="'+obj.user.idchat+ '">' +
                                    '<div class="item-media"><img src="' + obj.avatar + '" width="44"/></div>' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title-row">' +
                                            '<div class="item-title">' + obj.user.local.name + '</div>' +
                                        '</div>' +
                                        '<div class="item-subtitle">Online</div>' +
                                    '</div>' +
                                '</li>';
                } else {
                    var id = Number(idchat) + Number(obj.user.idchat);
                    linkHTML = '<li id="' +obj.user.idchat+ '"><a href="/chat/' + id +
                            '" class="item-link item-content">' +
                            '<div class="item-media"><img src="' + obj.avatar + '" width="44"></div>' +
                            '<div class="item-inner">' +
                                '<div class="item-title-row">' +
                                    '<div class="item-title">'+ obj.user.local.name + '</div>' +
                                '</div>' +
                                '<div class="item-subtitle">Online</div>' +
                            '</div></a>' +
                            '</li>';
                    }
                };
                ptrContent.find('ul').prepend(linkHTML);
            });
        }
    }

});

// var myApp = new Framework7({
//     onBeforePageInit: function (page) {
//         // Do something when page just added to DOM
//         console.log(page);
//     },
//     onPageInit: function (page) {
//         // Do something on page init
//         console.log(page);
//     },
//     onPageAfterAnimation: function (page) {
//         // Do something on page before animation start
//         console.log(page);
//     },
//     onPageBeforeAnimation: function (page) {
//         // Do something on page ready(centered)
//         console.log(page);
//     }
// });


// Expose Internal DOM library
/*var $$ = myApp.$;
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    console.log('page info: ' + page);
    // Pull to refresh content
        var ptrContent = $$(page.container).find('.pull-to-refresh-content');
        // var ptrContent = $(".pull-to-refresh-content");
        // Add 'refresh' listener on it
        // Dummy Content
        var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
        var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];
        ptrContent.on('refresh', function (e) {
            // Emulate 2s loading
            setTimeout(function () {
                var picURL = 'http://hhhhold.com/88/d/jpg?' + Math.round(Math.random() * 100);
                var song = songs[Math.floor(Math.random() * songs.length)];
                var author = authors[Math.floor(Math.random() * authors.length)];
                var linkHTML = '<li class="item-content">' +
                                    '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title-row">' +
                                            '<div class="item-title">' + song + '</div>' +
                                        '</div>' +
                                        '<div class="item-subtitle">' + author + '</div>' +
                                    '</div>' +
                                '</li>';
                ptrContent.find('ul').prepend(linkHTML);
                // When loading done, we need to "close" it
                myApp.pullToRefreshDone();
            }, 2000);
        });

});

*/
