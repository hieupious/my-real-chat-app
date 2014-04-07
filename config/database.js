/// configure database
// Use mongodb database
// Either build-in mongodb database or use services db in heroku
//or modulusmongo - 'mongodb://admin:123456@novus.modulusmongo.net:27017/umi7xuMi'

// config/database.js
module.exports = {

    // 'url' : 'mongodb://admin:123456@novus.modulusmongo.net:27017/umi7xuMi' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
 'url' : 'mongodb://localhost/privatechatdb'
};
