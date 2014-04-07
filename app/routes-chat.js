// app/routes-chat.js

// This file is required by server.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Use the gravatar module, to turn email addresses into avatar images:

var gravatar = require('gravatar');
var User       = require('../app/models/user');
var _ = require('underscore')._;

// Export a function, so that we can pass
// the app and io instances from the app.js file:

module.exports = function(app,io){

    app.get('/create', function(req, res){
        // Generate unique id for the room
        var id = Math.round((Math.random()*1000000));

        // Redirect
        res.redirect('/chat/' + id);
    })
    app.get('/chat/:id', function(req,res){
        console.log('req param: ' + req.param("id"));
        // Render the messages.ejs view
        res.render('messages.ejs', {
            idchat: req.param("id")
        });
    });


    var people = {};
    var rooms = {};
    var sockets = [];
    var chatHistory = {};

    // Initialize new socket.io application.
    var chat = io.of('/socket').on('connection', function (socket) {
        // Listen people online when login into profile page
        socket.on('online', function(data){
            User.findOne({ 'idchat' :  data.id }, function(err, user){
                if(err)
                    return err;
                else {
                    if (user) {
                        var email;
                        if(user.local.email) email = user.local.email
                            else if (user.facebook.email) email = user.facebook.email
                            else if (user.twitter.email) email = user.twitter.email
                                else if(user.google.email) email = user.google.email
                                if(email) avatar = gravatar.url(email, {s: '140', r: 'x', d: 'mm'})
                                    else avatar = "../img/unnamed.jpg"
                        people[data.id] = {"user" : user, "device": data.device, "avatar":avatar};
                        chat.emit('peopleonline', {
                        number: _.size(people),
                        listclient: people
                        });
                    };

                }
            });
        });

        // Go to message page

        socket.on('onchat', function(data){

            socket.room = data.idchat;

            socket.join(data.idchat);
            if (chat.clients(data.idchat).length == 2) {

            };
        });


        // When the client emits the 'load' event, reply with the
        // number of people in this chat room

        /*socket.on('load', function(data){
            console.log('data on load emit: ' + data);
            if(chat.clients(data).length === 0 ) {
                socket.emit('peopleinchat', {number: 0});
            }
            else if(chat.clients(data).length === 1) {

                socket.emit('peopleinchat', {
                    number: 1,
                    user: chat.clients(data)[0].username,
                    avatar: chat.clients(data)[0].avatar,
                    id: data
                });
            }
            else if(chat.clients(data).length >= 2) {

                chat.emit('tooMany', {boolean: true});
            }
        });
*/


        // when user emit create new chat with another,
        // create new room by combine two user id.
        // save their information
        //
        /*socket.on('createNewChat', function(data){

            // Only two people per room are allowed

            if (chat.clients(data.id).length < 2) {

                // use the socket object to store data. Each client gets
                // their own unique socket object
                socket.username = data.user;
                socket.room = data.id;
                socket.avatar = gravatar.url(data.avatar, {s:'140', r: 'x', d: 'mm'});

                // Tell the person what we should use for an avatar
                socket.emit('img', socket.avatar); /// Not yet use

                // Add the clients to the room
                socket.join(data.id);

                if(chat.clients(data.id).length == 2) {
                    var usernames = [],
                        avatars = [];

                        usernames.push(chat.clients(data.id)[0].username);
                        usernames.push(chat.clients(data.id)[1].username);

                        avatars.push(chat.clients(data.id)[0].avatar);
                        avatars.push(chat.clients(data.id)[1].avatar);

                        // Send the startChat event to all the people
                        // in the room, along with list of people that are in it
                        chat.in(data.id).emit('startChat', {
                            boolean: true,
                            id: data.id,
                            users: usernames,
                            avatars: avatars
                        });
                }
            } else {
                socket.emit('tooMany', {boolean: true});
            }
        });
*/
        // Somebody left the chat
        socket.on('disconnect', function(){

            // Notify the other person in the chat room
            // that his partner has left
            socket.broadcast.to(this.room).emit('leave', {
                boolean: true,
                room: this.room,
                user: this.username,
                avatar: this.avatar
            });

            // leave the room
            socket.leave(socket.room);
        });

        // Handle the sending of messages
        socket.on('msg', function(data){

            // when the server receives a message, it sends
            // it to the other person in the room
            socket.broadcast.to(socket.room).emit('receive', {
                msg: data.msg //,
                //user: data.user,
                //img: data.img
            });
        });


    });
};
