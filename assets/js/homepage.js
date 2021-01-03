//var gameName = "";

//var action = document.getElementById('action').src='https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg';

//$("#action").css("background-image", "url('https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg')");
//$("#action").css("background-image", "url('https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg')");

// date time function

var dateTime = luxon.DateTime.local();

var apiDataFunction = function () {
  //var apiUrl =  "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
  //var apiUrl = "https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added?key=f58ccbebc042468c979cde0ac7353b65"
  //var apiUrl = "https://api.rawg.io/api/games?genres=4"
  var apiUrl = "https://api.rawg.io/api/genres";

  //ask about fetching specific string values.

  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
  

      gameGenre = 0;
      var modalSelect = document.getElementById("modal1");
      var instance = M.Modal.getInstance(modalSelect);
      var modalFormat = document.getElementById('modalFormat')

      for (let i = 0; i < data.results.length; i++) {
       // const element = array[i];
      
      var modalDiv = document.createElement("div");
      
      modalDiv.classList.add('modalImg', 'col', 'l3', 'genreClass' + i)
      modalFormat.appendChild(modalDiv);

        var genreText = (data.results[i].name)
      

          
      $(".genreClass" + i)
        //.css("background-image", "url(" + data.results[i].image_background + ")")
        .css("background-image", `url(${data.results[i].image_background})`).text(genreText)
        .click(function () {
               gameGenre = data.results[i].id;
              instance.close();
             apiDataFunctionTwo(gameGenre);
             });
       
        
      }
      // modal images for generes


     
    });
  });
};

// api for finding games withing a specific genre
var apiDataFunctionTwo = function (gameGenre) {
  // var apiUrlTwo =  "https://api.rawg.io/api/platforms?key=f58ccbebc042468c979cde0ac7353b65"
  // fetches data for anticipated 2020 games

  var apiUrlTwo =
    "https://api.rawg.io/api/games?genres=" +
    gameGenre +
    // most popular games from 2000 to 2020
    "&dates=2000-01-01,2020-12-31&ordering=-added&platforms=4";
  //var apiUrlTwo = "https://www.cheapshark.com/api/1.0/games?title=" + gameName + "&limit=60&exact=0";
  //var apiUrlTwo = 'https://api.rawg.io/api/games?id=3328?'
  //var apiUrlTwo = 'https://api.rawg.io/api/genres'
  // var apiUrlTwo = 'https://api.rawg.io/api/platforms'
  //var apiUrlTwo =  'https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added?key=f58ccbebc042468c979cde0ac7353b65'
  // var apiUrlTwo =  'https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&platforms=4&key=f58ccbebc042468c979cde0ac7353b65'
  //f58ccbebc042468c979cde0ac7353b65

  // generates random number to change randomly selected game after each click.
  var randomNumGen = Math.floor(Math.random() * 20);
  
  fetch(apiUrlTwo).then(function (response) {
    response.json().then(function (data) {
   console.log(data)

      var gameName = data.results[randomNumGen].name;
      console.log(gameName)
     
      // later look into adding background image when clip is null
      var resultVideoData = (data.results[randomNumGen].clip.clip)
      console.log(data.results[randomNumGen].metacritic)

      // metacritic score
    
       var metacriticText = (data.results[randomNumGen].metacritic)
       
       $(".metacriticStyle")
       .text(metacriticText)
     

      
   

      apiDataFunctionCheapShark(gameName);

      resultVideo(resultVideoData)
    });
  });
};

// function to find discount on cheapshark api
var apiDataFunctionCheapShark = function (gameName) {
  // name of game for discount search
  var apiUrlCheapShark =
    "https://www.cheapshark.com/api/1.0/games?title=" +
    gameName +
    "&limit=60&exact=0";

  fetch(apiUrlCheapShark).then(function (response) {
    response.json().then(function (data) {
      console.log(data)
      //String.prototype.indexOf()
      var gameId = data[0].steamAppID;
      

      $(".discountDiv")
      //.css("background-image", "url(" + data.results[i].image_background + ")")
      .css("background-image", `url(${data[0].thumb})`).text('Cheapest Discount Found: $' + data[0].cheapest)
     
     


      //indexes position of text
      var test2 = data[0].external;
      console.log(test2);
      var test3 = data[0].internalName;
      console.log(test3);
      console.log(gameName);
      var testing = test2.indexOf(gameName);
      console.log(testing);
      var testFilter = data.filter(
        (gameDetails) => gameDetails.external.indexOf(gameName) >= 0
      );
      console.log(testFilter);
      var testFilter = data.filter(
        (gameDetails) => gameDetails.external.indexOf(gameName) === 0
      );
      
      
      //console.log(testFilter);


    });
  });
};
// function resultVideo(resultVideoData){
    
//   var videourl = "url(" + resultVideoData + ")"; // set the url to your video file here
//   var videocontainer = '#returnedVideo'; // set the ID of the container that you want to insert the video in
//   //var parameter = new Date().getMilliseconds();  //  generate variable based on current date/time

//   var video = '<video width="1102" height="720" id="intro-video" autoplay loop src="' + videourl + '"></video>'; // setup the video element

//   $(videocontainer).append(video); // insert the video element into its container

//   //videl = $(document).find('#intro-video')[0]; // find the newly inserterd video
  
//   //videl.load(); // load the video (it will autoplay because we've set it as a parameter of the video)

// }
// var resultVideo = function(resultVideoData){
//   console.log(resultVideoData)
//   var returnedVideo = document.getElementById("#returnedVideo")
//   var videlem = document.createElement('video');
  
//   var sourceMP4 = document.createElement("source"); 
//   sourceMP4.type = "video/mp4";
//   sourceMP4.src = "url(" + resultVideoData + ")"
//   sourceMP4.autoplay = true;
//   returnedVideo.appendChild(videlem);
//   videlem.appendChild(sourceMP4);

// }

// loads video of game
var resultVideo = function(resultVideoData) {

 var returnedVideo = document.getElementById("returnedVideo");
 //document.getElementById('#returnedVideo').src="images/my_other_image.png"
 returnedVideo.src = resultVideoData
 console.log(returnedVideo)
 var gameVideo = document.getElementById("gameVideo")
 gameVideo.autoplay = true;
  gameVideo.load()
};


apiDataFunction();

// modal for searching game types
$(document).ready(function () {
  $(".modal").modal();
});


// gets data for highest games
var highestRatedGames = function() { 

console.log(dateTime)

// generates random number to show games from different generes
var randomNumGen = Math.floor(Math.random() * 20);

var apiHighestRated = 'https://api.rawg.io/api/games?dates=2001-01-01,' + dateTime + '&ordering=-rating'

  // generates random number to change randomly selected game after each click.
  
  fetch(apiHighestRated).then(function (response) {
    response.json().then(function (data) {
   console.log(data.results[randomNumGen].name)

  
     
      
    });
  });
};
highestRatedGames();

// var randomNumGen = Math.floor(Math.random() * 20);
  
//   fetch(apiUrlTwo).then(function (response) {
//     response.json().then(function (data) {
//    console.log(data)

//       var gameName = data.results[randomNumGen].name;
//       console.log(gameName)
     
//       // later look into adding background image when clip is null
//       var resultVideoData = (data.results[randomNumGen].clip.clip)
//       console.log(data.results[randomNumGen].metacritic)
// var apiDataFunctionThree = function () {

// var apiUrlTwo = "https://api.rawg.io/api/games?ordering=-metacritic"

// fetch(apiUrlTwo).then(function (response) {
//   response.json().then(function (data) {
//     console.log(data);

//   });
// });

// };
// apiDataFunctionThree();
//https://corycalaway.github.io/gamer-portal/

//testing branch
