// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '453294641467805', // your App ID
		'clientSecret' 	: 'c54aef0ab9248ac9ab1867ced7fd0a26', // your App Secret
		'callbackURL' 	: 'http://localhost:8888/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'wjW3frCKVffPbumWysZrp4SJi',
		'consumerSecret' 	: 'ALhlwClcOctWAbZEiGArzXQscKyDNars0zfhfoYnh83MjGM9X0',
		'callbackURL' 		: 'http://127.0.0.1:8888/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '703258563255.apps.googleusercontent.com',
		'clientSecret' 	: '703258563255@developer.gserviceaccount.com',
		'callbackURL' 	: 'http://127.0.0.1:8888/auth/google/callback'
	}

};
