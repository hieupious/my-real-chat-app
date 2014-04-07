/*// chat.js - client

$(function(){

    // connect to the socket
    var socket = io.connect('/socket');

    // cache some jQuery objects
    var personInside = $(".personinside"),
        chatScreen = $(".chatscreen"),
        left = $(".left"),
        noMessages = $(".nomessages"),
        tooManyPeople = $(".toomanypeople");

    // some more jquery objects
    var chatNickname = $(".nickname-chat"),
        leftNickname = $(".nickname-left"),
        // loginForm = $(".loginForm"),
        yourName = $("#yourName"),
        yourEmail = $("#yourEmail"),
        hisName = $("#hisName"),
        hisEmail = $("#hisEmail"),
        chatForm = $("#chatform"),
        textarea = $("#ks-messages-input"),
        messageTimeSent = $(".timesent"),
        chats = $(".chats");

    // these variables hold images
    var ownerImage = $("#ownerImage"),
        leftImage = $("#leftImage"),
        noMessagesImage = $("#noMessagesImage");


    // on connection to server get the id of person's room
    socket.on('connect', function(){

        socket.emit('load', id);
    });

    // save the gravatar url
    socket.on('img', function(data){
        img = data;
    });

    // receive the names and avatars of all people in the chat room
    socket.on('peopleinchat', function(data){

        if(data.number === 0){

            // showMessage("inviteSomebody");

            // call the server-side function 'login' and send user's parameters
            socket.emit('login', {user: name, avatar: email, id: id});


        }

        else if(data.number === 1) {

            showMessage("personinchat",data);

            loginForm.on('submit', function(e){

                e.preventDefault();

                name = $.trim(hisName.val());

                if(name.length < 1){
                    alert("Please enter a nick name longer than 1 character!");
                    return;
                }

                if(name == data.user){
                    alert("There already is a \"" + name + "\" in this room!");
                    return;
                }
                email = hisEmail.val();

                if(!isValid(email)){
                    alert("Wrong e-mail format!");
                }
                else{

                    socket.emit('login', {user: name, avatar: email, id: id});
                }

            });
        }

        else {
            showMessage("tooManyPeople");
        }

    });

    // Other useful

    socket.on('startChat', function(data){
        if(data.boolean && data.id == id) {

            chats.empty();

            if(name === data.users[0]) {

                showMessage("youStartedChatWithNoMessages",data);
            }
            else {

                showMessage("heStartedChatWithNoMessages",data);
            }

            chatNickname.text(friend);
        }
    });

    socket.on('leave',function(data){

        if(data.boolean && id==data.room){

            showMessage("somebodyLeft", data);
            chats.empty();
        }

    });

    socket.on('tooMany', function(data){

        if(data.boolean && name.length === 0) {

            showMessage('tooManyPeople');
        }
    });


});



var myApp = new Framework7({
    onBeforePageInit: function (page) {
        // Do something when page just added to DOM
        // console.log(page);
    },
    onPageInit: function (page) {
        // Do something on page init
        // console.log(page);
    },
    onPageAfterAnimation: function (page) {
        // Do something on page before animation start
        // console.log(page);
    },
    onPageBeforeAnimation: function (page) {
        // Do something on page ready(centered)
        // console.log(page);
    }
});

var socket = io.connect('/socket');




// Expose Internal DOM library
var $$ = myApp.$;
var conversationStarted = false;
$$('.ks-messages-form').on('submit', function (e) {
    e.preventDefault();
    var input = $$(this).find('.ks-messages-input');
    var messageText = input.val();
    if (messageText.length === 0) return;
    // Empty input
    input.val('');
    // Add Message
    myApp.addMessage({
        text: messageText,
        type: 'sent',
        day: !conversationStarted ? 'Today' : false,
        time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
    });
    conversationStarted = true;
    // Send the message to the other person in the chat
    socket.emit('msg', {msg: messageText});
});

$$('.ks-send-message').tap(function () {
    $$('.ks-messages-form').trigger('submit');
});

socket.on('receive', function(data){
    myApp.addMessage({
        text: data.msg,
        type: 'received'
    });

});
*/
