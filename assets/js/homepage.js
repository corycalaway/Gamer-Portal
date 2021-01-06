//var gameName = "";

//var action = document.getElementById('action').src='https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg';

//$("#action").css("background-image", "url('https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg')");
//$("#action").css("background-image", "url('https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg')");

// date time function
var list = JSON.parse(localStorage.getItem("saveGameId")) || [];

//starts page with last five searches
while (list.length > 6) {
  localStorage.removeItem(0)
  list.shift();


  localStorage.setItem("saveGameId", JSON.stringify(list));
}

var dateTime = luxon.DateTime.local();

//search game by id for api
var apiSearchHistory = function() {
  
for (let i = 0; i < 5; i++) {

var apiUrlHistory = 'https://api.rawg.io/api/games/' + list[i];

fetch(apiUrlHistory).then(function(response) {
  response.json().then(function (data) {
    recentlySearchedGames

    var recentlySearchedCard = $('<div>')
     .addClass('cardDisplay card red cardReset')
    .attr('id', 'clickElement' + list[i])
     var recentlySearchedGameName = $('<div>')
    .addClass('recentlySearchedFormatText')
    .text(data.name)

    var recentlySearchedGameBox = $('<div>')
     .addClass('imageSize')


    var recentlySearchedGameOne = $('<div>')
    .addClass('recentlySearchedFormat')
   .attr('id', 'recentlySearchedGame')
   .css("background-image", "url(" + data.background_image + ")")

   $("#recentlySearchedGames").append(recentlySearchedCard)
   
   $(recentlySearchedCard).append(recentlySearchedGameBox)
    $(recentlySearchedCard).append(recentlySearchedGameName)
    $(recentlySearchedGameBox).append(recentlySearchedGameOne)


    $('#clickElement' + list[i]).on('click',function(){

      var gameId = list[i]
      gameIdFunction(gameId)
    })
  })
})}
};
apiSearchHistory()


var apiDataFunction = function () {

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
      
      modalDiv.classList.add('modalImg', 'col', 'l4', 'genreClass' + i)
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

  // generates random number to change randomly selected game after each click.
  var randomNumGen = Math.floor(Math.random() * 20);
  
  fetch(apiUrlTwo).then(function (response) {
    response.json().then(function (data) {

      var gameName = data.results[randomNumGen].name;

    
      var gameId = data.results[randomNumGen].id;

      //restores local saved data to last five searches
      while (list.length > 5) {
        list.shift();
        localStorage.setItem("saveGameId", JSON.stringify(list));
      }



      $('.cardReset').remove();
      apiSearchHistory()

      list.push(gameId)
        localStorage.setItem("saveGameId", JSON.stringify(list));
    
   
     gameIdFunction(gameId, gameName)
          
          });
        });
      };
      
var gameIdFunction = function(gameId, gameName) {

      var apiUrlId = 'https://api.rawg.io/api/games/' + gameId;

      fetch(apiUrlId).then(function(response) {
        response.json().then(function (data) {

          gameName = data.name

          $('#gameNameDisplay').text(gameName)
      // checks if video is available and dynamically adds and removes element
      // var gameVideo = document.getElementById("gameVideo")
      if (data.clip === null) {
        var resultVideoData = (data.background_image)
        $('#gameVideo').remove();
        var videoFail = document.createElement("div");
        $(videoFail).attr('id', 'gameVideo').css("background-image", `url(${data.background_image})`).addClass('videoFailSize')
        $('#attachVideo').append(videoFail)
        

      } else {
        $('#gameVideo').remove();
        var resultVideoData = (data.clip.clip)
        var video = $('<video />', {
          id: 'gameVideo',
          src: resultVideoData,
          type: 'vide/mp4',
          controls: true,
          width: '320',
          heigh: '240'
        });
        video.appendTo($('#attachVideo'))
        
        // gameVideo.classList.remove('hide');
        // resultVideo(resultVideoData)
      }

// {/* <video class="z-depth-5 hide" id="gameVideo" width="320" height="240" controls>
//                   <source id='returnedVideo' src='' type="video/mp4">
//                 </video> */}



      // metacritic score
    console.log(data)
       var metacriticText = (data.metacritic)
       var ratingText = (data.rating)
  console.log(metacriticText)

      // when no metacritic score is found
       if (metacriticText === null) {
        $(".metacriticStyle").addClass("bluemeta").text('No Metacritic Score Found').removeClass('greenmeta yellowmeta redmeta')
       } else {

       $(".metacriticStyle")
       .text(metacriticText)

       if (metacriticText >= 80) {
         $(".metacriticStyle").addClass("greenmeta").removeClass('bluemeta yellowmeta redmeta')

       } else if (metacriticText >= 60 && metacriticText <= 79){
          $(".metacriticStyle").addClass("yellowmeta").removeClass('greenmeta bluemeta redmeta')
       } else {
         $(".metacriticStyle").addClass("redmeta").removeClass('greenmeta yellowmeta bluemeta')
       } 
      }

       // user rating score
       if (ratingText === null) {
        $(".ratingStyle").addClass("bluemeta").text('No User Rating Found').removeClass('greenmeta yellowmeta redmeta')

       } else {
       $(".ratingStyle")
       .text(ratingText)
       if (ratingText >= 4) {
         $(".ratingStyle").addClass("greenmeta").removeClass('bluemeta yellowmeta redmeta')
       } else if (ratingText >= 3 && ratingText < 4){
          $(".ratingStyle").addClass("yellowmeta").removeClass('greenmeta bluemeta redmeta')
       } else {
         $(".ratingStyle").addClass("redmeta").removeClass('greenmeta yellowmeta bluemeta')
       } 
      }
      
   

      apiDataFunctionCheapShark(gameName);

      
        })
      })
    }
// function to find discount on cheapshark api
var apiDataFunctionCheapShark = function (gameName) {
  // name of game for discount search
  var apiUrlCheapShark =
    "https://www.cheapshark.com/api/1.0/games?title=" +
    gameName +
    "&limit=60&exact=0";

  fetch(apiUrlCheapShark).then(function (response) {
    response.json().then(function (data) {
      
    // if no deal is found display text
    if (data.length === 0) {
      $(".discountDivText").text('Unable to locate a discount for ' + gameName + '.')
      $(".discountDiv").css("background-image", '')
    } else {
      // display discount
      
      //.css("background-image", "url(" + data.results[i].image_background + ")")
      $(".discountDivText").text('Cheapest Discount Found: $' + data[0].cheapest)
      $(".discountDiv").css("background-image", `url(${data[0].thumb})`)

      $('.discountDiv').on('click',function(){
        //window.location.href = 'https://store.steampowered.com/app/' + data[0].steamAppID;

        // links to cheap deal
        window.location.href = 'https://www.cheapshark.com/redirect?dealID=' + data[0].cheapestDealID;
      })

     
    }


    });
  });
};

    


// loads video of game
var resultVideo = function(resultVideoData) {
  var gameVideo = document.getElementById("gameVideo")
 // gameVideo.classList.remove('hide');
 var returnedVideo = document.getElementById("returnedVideo");
 //document.getElementById('#returnedVideo').src="images/my_other_image.png"
 returnedVideo.src = resultVideoData
 
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

// generates random number to show games from different generes
var randomNumGen = Math.floor(Math.random() * 15);

var apiHighestRated = 'https://api.rawg.io/api/games?dates=2001-01-01,' + dateTime + '&ordering=-rating'

  // generates random number to change randomly selected game after each click.
  
  fetch(apiHighestRated).then(function (response) {
    response.json().then(function (data) {

      // selects top game from 5 generes
   // creates loop for highest rated data
   // need to generate alternate image for when background image = null
   for (let i = 0; i < 5; i++) {

    var highestRatedCard = $('<div>')
    .addClass('cardDisplay card red')
    .attr('id', 'highestRatedCard' + i)

    var highestRatedGameName = $('<div>')
    .addClass('highestRatedFormatText')
    .text(data.results[randomNumGen + i].name)

    var highestRatedGameBox = $('<div>')
    .addClass('imageSize')

    if (data.results[randomNumGen + i].background_image === null) {
      var highestRatedGameOne = $('<i>')
      .addClass('material-icons iconImageFail')
      .attr('id', 'highestRatedGame' + i)
      .text('stars')

    } else {
   var highestRatedGameOne = $('<div>')
   .addClass('highestRatedFormat')
   .attr('id', 'highestRatedGame' + i)
   .css("background-image", "url(" + data.results[randomNumGen + i].background_image + ")")
    }
   $("#highestRatedGames").append(highestRatedCard)
   
   $(highestRatedCard).append(highestRatedGameBox)
   $(highestRatedCard).append(highestRatedGameName)
   $(highestRatedGameBox).append(highestRatedGameOne)
   
   
   // click card for highest rated section to search for game

   $('#highestRatedCard' + i).on('click',function(){

    var gameId = data.results[randomNumGen + i].id
    gameIdFunction(gameId)
  })
     
}    
    });
  });
};
highestRatedGames();

$(document).ready(function(){
  $('.materialboxed').materialbox();
});

$(document).ready(function(){
  $('.tooltipped').tooltip();
});

// most ancticipated games
var anticipatedGames = function() { 
  
  // generates random number to show games from different generes
  var randomNumGen = Math.floor(Math.random() * 15);
  //https://api.rawg.io/api/games?dates=2019-10-10,2020-10-10&ordering=-added
  var apiAnticipated = 'https://api.rawg.io/api/games?dates=2019-10-10,' + dateTime + '&ordering=-added'
  
    // generates random number to change randomly selected game after each click.
    
    fetch(apiAnticipated).then(function (response) {
      response.json().then(function (data) {
        
        // selects top game from 5 generes
     // creates loop for highest rated data
     // need to generate alternate image for when background image = null
     for (let i = 0; i < 5; i++) {
  
      var anticipatedCard = $('<div>')
      .addClass('cardDisplay card red')
      .attr('id', 'anticipatedCard' + i)

      var anticipatedGameName = $('<div>')
      .addClass('anticipatedFormatText')
      .text(data.results[randomNumGen + i].name)
  
      var anticipatedGameBox = $('<div>')
      .addClass('imageSize')
  
      if (data.results[randomNumGen + i].background_image === null) {
        var anticipatedGameOne = $('<i>')
        .addClass('material-icons iconImageFail')
        .attr('id', 'anticipatedGame' + i)
        .text('stars')
  
      } else {
     var anticipatedGameOne = $('<div>')
     .addClass('anticipatedFormat')
     .attr('id', 'anticipatedGame' + i)
     .css("background-image", "url(" + data.results[randomNumGen + i].background_image + ")")
      }
     $("#anticipated").append(anticipatedCard)
     
     $(anticipatedCard).append(anticipatedGameBox)
     $(anticipatedCard).append(anticipatedGameName)
     $(anticipatedGameBox).append(anticipatedGameOne)


     // makes most ancitipated section clickable
      $('#anticipatedCard' + i).on('click',function(){

    var gameId = data.results[randomNumGen + i].id
    gameIdFunction(gameId)
  })
     }
       
        
      });
    });
  };
  anticipatedGames();


  var resultBackgroundImage = function (resultBackgroundImage) {
  }