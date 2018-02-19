var dotenv = require("dotenv").config();
var file = require("file-system");
var fse = require('fs-extra');
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var liriArg = process.argv[2];

// liriArg (process.argv[2]) commands
switch(liriArg) {
  case "my-tweets": 
    myTweets(); 
    break;
  case "spotify-this-song":
    spotifyThisSong(); 
    break;
  case "movie-this":
    movieThis(); 
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default: console.log("Type your terminal commands after 'node liri.js', then hit enter. For example: my-tweets 'twitter name' ");
};

// Tweet function to call Twitter API.
function myTweets() {
  var client = new Twitter ({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret,
  });
  var twitterUser = process.argv[3];
  twitterUser = "briarJoe";
  var params = {screen_name: twitterUser, count: 20 };

  // Returns a collection of the most recent 20 Tweets posted by the user indicated by the (user) screen_name or user_id parameters.
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (error) {
      console.log('Error occurred: ' + err);
      return;
    } else {
        for (var i = 0; i < 5; i++) {
          var tweetInfo = tweets;
          if (tweetInfo[i] != undefined) {
            var results = 
            "Username: " + tweetInfo[i]
            .user.screen_name + "\n" +
            "Tweet: " + tweetInfo[i].text + "\n" +
            "Date Created: " + tweetInfo[i].created_at + "\n";
            console.log(results);
        }
      }
    }
  });
}

// Spotify function to call Spotify API
function spotifyThisSong(songName) {
  var spotifyClient = new Spotify(keys.spotify);
  songName = process.argv[3];

  if (!songName) {
    songName = "The Sign";
    console.log("You didn't specify a song but try this one:'The Sign'. \n");
  }
  params = songName;

  spotifyClient.search({ type: 'track', limit: 5, query: params }, function(err, data) {
    if (err ) {
      console.log('Error occurred: ' + err);
      return;
    } 
      // console.log(data.tracks.items[0]);
      var songInfo = data.tracks.items;
      for (var i = 0; i < 5; i++) {
        if (songInfo[i] != undefined) {
          var results = 
          "Artist: " + songInfo[i].artists[0].name + "\n" +
          "Song: " + songInfo[i].name + "\n" +
          "Album: " + songInfo[i].album.name + "\n" +
          "Preview Url: " + songInfo[i].preview_url + "\n";
          console.log(results);
        }
     };
  });
}
  // This function, uses fse module that reads & writes to access the random.txt file and execute the text in command line.
  function doWhatItSays(){
    fse.readFile("random.txt", "utf8", function(err,data) {
      if (err) {
        console.log("Error occurred" + err);
      } else {
        var results = data.split(",");
        var arg2 = results[0];
        var arg3 = results[1];
        process.argv.splice(2,1)
        process.argv.push(arg2);
        process.argv.push(arg3);
        spotifyThisSong(); 
      }
    }); 
  }

// Function to find movies using request module & OMDB API
function movieThis() {
  var movie = process.argv[3];
  if (!movie) {
    movie = "Mr. Nobody";
    console.log("You didn't specify a movie but you might like this one:'Mr. Nobody'. \n");
  }

  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy", function (error, response, body) {
    if (error ) {
      console.log('Error occurred: ' + error);
      return;
    } else {
      var movieObj = JSON.parse(body); 
        if (movieObj!= undefined) {
          var results = 
          "Title: " + movieObj.Title + "\n" +
          "Year: " + movieObj.Year + "\n" +
          "Imdb Rating: " + movieObj.imdbRating + "\n" +
          "Rotten Tomatoes Rating: " + movieObj.tomatoRating + "\n" +
          "Country: " + movieObj.Country + "\n" +
          "Language: " + movieObj.Language + "\n" +
          "Plot: " + movieObj.Plot + "\n" +
          "Actors: " + movieObj.Actors + "\n" 
          console.log(results);
      }
   }
  })
}
