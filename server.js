'use strict';

/*
 * nodejs-express-mongoose-demo
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */



/**
 * Module dependencies
 */

require('dotenv').config();
const mongoose = require('mongoose');
const config = require('./config');


var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

// const models = join(__dirname, 'app/models');
const port = process.env.PORT || 3000;
// const app = express();


  MongoClient.connect(config.db, function(err, db) {
        
        assert.equal(null, err);
        console.log("Connected correctly to server.");

        var id =  '58766e95c44fb9e02114d2c0';
        findFeed(db, id, function(res) {
          if(res) {
            if(res.audio && res.audio.url) {
              
              // updateFeed
                getAudioDuration(res.audio.url, function(duration){
                  updateFeed(db, id, duration,  function(response) {

                    if(response)
                      console.log('sucssfully updated to db');
                      
                    db.close();
                  });

                });
              
            }
              
          }
          
          
          return;
        });

        
});



var getAudioDuration = function(audioUrl, callback) {
    
    callback(2500);
   
};

var findFeed = function(db, id,  callback) {

    
   var cursor =db.collection('Feed').find({'_id':ObjectId(id)});
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        //  console.dir(doc);
        if(doc.audio) {
            // console.log(doc.audio.url)
            callback (doc);
            
        } else {
            callback (null)
        }
        

      } else {
         callback(null);
      }
   });
};

var updateFeed = function(db, id, duration, callback) {
   db.collection('Feed').updateOne(
      { "_id" : ObjectId(id) },
      {
        $set: { "audio.duration": duration },
      }, function(err, results) {
      callback(results);
   });
};

function connect () {
  // console.log(config.db);
  return true;
  // var options = { server: { socketOptions: { keepAlive: 1 } } };
//  return mongoose.connect(config.db, options).connection;

}
