//var gameName = "";

//var action = document.getElementById('action').src='https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg';

//$("#action").css("background-image", "url('https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg')");
//$("#action").css("background-image", "url('https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg')");

var apiDataFunction = function () {
  //var apiUrl =  "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
  //var apiUrl = "https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added?key=f58ccbebc042468c979cde0ac7353b65"
  //var apiUrl = "https://api.rawg.io/api/games?genres=4"
  var apiUrl = "https://api.rawg.io/api/genres";

  //ask about fetching specific string values.

  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      gameGenre = 0;
      var modalSelect = document.getElementById("modal1");
      var instance = M.Modal.getInstance(modalSelect);
      var modalFormat = document.getElementById('modalFormat')

      for (let i = 0; i < 19; i++) {
       // const element = array[i];
       console.log(data.results[i])
      console.log(i)
      var modalDiv = document.createElement("div");
      
      modalDiv.classList.add('modalImg', 'col', 'l3', 'genreClass' + i)
      modalFormat.appendChild(modalDiv);

        var genreText = (data.results[i].name)
        console.log(genreText)

          
      $(".genreClass" + i)
        //.css("background-image", "url(" + data.results[i].image_background + ")")
        .css("background-image", `url(${data.results[i].image_background})`).text(genreText)
        .click(function () {
               gameGenre = data.results[i].id;
              instance.close();
             apiDataFunctionTwo(gameGenre);
             });
        console.log(data.results[i].id)
        
      }
      // modal images for generes
      // var actionImg = data.results[0].image_background;
      // var indieImg = data.results[1].image_background;
      // var adventureImg = data.results[2].image_background;
      // var rpgImg = data.results[3].image_background;
      // var strategyImg = data.results[4].image_background;
      // var shooterImg = data.results[5].image_background;
      // var casualImg = data.results[6].image_background;
      // var simulationImg = data.results[7].image_background;
      // var puzzleImg = data.results[8].image_background;
      // var arcadeImg = data.results[9].image_background;
      // var platformerImg = data.results[10].image_background;
      // var racingImg = data.results[11].image_background;
      // var SportsImg = data.results[12].image_background;
      // var mmoImg = data.results[13].image_background;
      // var fightingImg = data.results[14].image_background;
      // var familyImg = data.results[15].image_background;
      // var boardgamesImg = data.results[16].image_background;
      // var educationalImg = data.results[17].image_background;
      // var cardImg = data.results[18].image_background;
      // var modalSelect = document.getElementById("modal1");
      // var instance = M.Modal.getInstance(modalSelect);

      //images and click events
      // $("#action")
      //   .css("background-image", "url(" + actionImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[0].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#indie")
      //   .css("background-image", "url(" + indieImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[1].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#adventure")
      //   .css("background-image", "url(" + adventureImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[2].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#rpg")
      //   .css("background-image", "url(" + rpgImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[3].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#strategy")
      //   .css("background-image", "url(" + strategyImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[4].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#shooter")
      //   .css("background-image", "url(" + shooterImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[5].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#casual")
      //   .css("background-image", "url(" + casualImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[6].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#simulation")
      //   .css("background-image", "url(" + simulationImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[7].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#puzzle")
      //   .css("background-image", "url(" + puzzleImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[8].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#arcade")
      //   .css("background-image", "url(" + arcadeImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[9].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#platformer")
      //   .css("background-image", "url(" + platformerImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[10].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#racing")
      //   .css("background-image", "url(" + racingImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[11].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#sports")
      //   .css("background-image", "url(" + SportsImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[12].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#mmo")
      //   .css("background-image", "url(" + mmoImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[13].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#fighting")
      //   .css("background-image", "url(" + fightingImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[14].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#family")
      //   .css("background-image", "url(" + familyImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[15].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#boardgames")
      //   .css("background-image", "url(" + boardgamesImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[16].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#educational")
      //   .css("background-image", "url(" + educationalImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[17].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      // $("#card")
      //   .css("background-image", "url(" + cardImg + ")")
      //   .click(function () {
      //     gameGenre = data.results[18].id;
      //     instance.close();
      //     apiDataFunctionTwo(gameGenre);
      //   });

      console.log(gameGenre);
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
    "&dates=2000-01-01,2020-12-31&ordering=-added";
  //var apiUrlTwo = "https://www.cheapshark.com/api/1.0/games?title=" + gameName + "&limit=60&exact=0";
  //var apiUrlTwo = 'https://api.rawg.io/api/games?id=3328?'
  //var apiUrlTwo = 'https://api.rawg.io/api/genres'
  // var apiUrlTwo = 'https://api.rawg.io/api/platforms'
  //var apiUrlTwo =  'https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added?key=f58ccbebc042468c979cde0ac7353b65'
  // var apiUrlTwo =  'https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&platforms=4&key=f58ccbebc042468c979cde0ac7353b65'
  //f58ccbebc042468c979cde0ac7353b65

  // generates random number to change randomly selected game after each click.
  var randomNumGen = Math.floor(Math.random() * 20);
  console.log(randomNumGen);

  fetch(apiUrlTwo).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      var gameName = data.results[randomNumGen].name;
      console.log(gameName);
      var resultVideoData = (data.results[randomNumGen].clip.clip)

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
      console.log(data);
      //String.prototype.indexOf()

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
  console.log(resultVideoData)
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
