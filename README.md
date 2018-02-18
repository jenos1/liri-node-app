# liri-node-app
* LIRI is a command line node application that takes in parameters and gives you back data.  LIRI is a Language Interpretation and Recognition Interface, similar to SIRI on the iPhone.

## Introduction
* It is run from the command line.
* From the terminal, enter the following:
  * node liri.js 
  * THEN one of the following categories:
    * my-tweets
    * spotify-this-song
    * movie-this
    * do-what-it-says
* After either the "spotify" or "movie" category, you may then add your selected song or movie to search for.
* Example for movie:
  * node liri.js movie-this 'movie name here'

## Installation
* Requires the following npm modules which will be loaded automatically:
  * fs-extra
  * dotenv
  * node-spotify-api
  * request
  * twitter
