// date time function
var dateTime = luxon.DateTime.local()

// stores game id for search history
var list = JSON.parse(localStorage.getItem("saveGameId")) || [];

//starts page with last five searches
while (list.length > 6) {
  localStorage.removeItem(0);
  list.shift();
  localStorage.setItem("saveGameId", JSON.stringify(list));
}

// search history game by id for api
var apiSearchHistory = function () {

  // loop goes through api using gameid provided from previous searches stored in local storage
  for (let i = 0; i < list.length; i++) {

    // creates api url for specific game ids
    var apiUrlHistory = "https://api.rawg.io/api/games/" + list[i];

    fetch(apiUrlHistory).then(function (response) {
      response.json().then(function (data) {

        // creates cards that hold recently searched image and text
        var recentlySearchedCard = $("<div>")
          .addClass("cardDisplay card red cardReset")
          .attr("id", "clickElement" + list[i]);
        var recentlySearchedGameName = $("<div>")
          .addClass("recentlySearchedFormatText")
          .text(data.name);

        var recentlySearchedGameBox = $("<div>").addClass("imageSize");

        var recentlySearchedGameOne = $("<div>")
          .addClass("recentlySearchedFormat")
          .attr("id", "recentlySearchedGame")
          .css("background-image", "url(" + data.background_image + ")");

        $("#recentlySearchedGames").append(recentlySearchedCard);

        $(recentlySearchedCard).append(recentlySearchedGameBox);
        $(recentlySearchedCard).append(recentlySearchedGameName);
        $(recentlySearchedGameBox).append(recentlySearchedGameOne);

        // makes previously searched games clickable
        $("#clickElement" + list[i]).on("click", function () {
          var gameId = list[i];

          // uses game id to re display the game when clicked
          gameIdFunction(gameId);
        });
      });
    });
  }
};

// activates search history on load of page
apiSearchHistory();


// function used to created displayed generes in modal when ready up is selected
var apiDataFunction = function () {
  var apiUrl = "https://api.rawg.io/api/genres";

  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      var gameGenre = 0;
      var modalSelect = document.getElementById("modal1");
      var instance = M.Modal.getInstance(modalSelect);
      var modalFormat = document.getElementById("modalFormat");

      // loop to create each from genres in order to select
      for (let i = 0; i < data.results.length; i++) {

        var modalDiv = document.createElement("div");

        modalDiv.classList.add("modalImg", "col", "l4", "genreClass" + i);
        modalFormat.appendChild(modalDiv);

        var genreText = data.results[i].name;

        $(".genreClass" + i)
          .css("background-image", `url(${data.results[i].image_background})`)
          .text(genreText)
          .click(function () {
            gameGenre = data.results[i].id;
            instance.close();

            // sends game genre to api in order to start search process
            apiDataFunctionTwo(gameGenre);
          });
      }
    });
  });
};

// api for finding games within a specific genre
var apiDataFunctionTwo = function (gameGenre) {
  // var apiUrlTwo =  "https://api.rawg.io/api/platforms?key=f58ccbebc042468c979cde0ac7353b65"
  // fetches data for anticipated 2020 games

  var apiUrlTwo =
    "https://api.rawg.io/api/games?genres=" +
    gameGenre +
    // most popular games from 2000 to current
    "&dates=2000-01-01," + dateTime + "&ordering=-added&platforms=4";

  // generates random number to change randomly selected game after each click.
  var randomNumGen = Math.floor(Math.random() * 20);

  fetch(apiUrlTwo).then(function (response) {
    response.json().then(function (data) {

      // gets game name from api
      var gameName = data.results[randomNumGen].name;

      //gets game id that matches game name
      var gameId = data.results[randomNumGen].id;

      //restores local saved data to last five searches
      while (list.length > 5) {
        list.shift();
        localStorage.setItem("saveGameId", JSON.stringify(list));
      }

      // removes and resets search history cards
      $(".cardReset").remove();
      apiSearchHistory();

      // saves new game searched into array for search history
      list.push(gameId);
      localStorage.setItem("saveGameId", JSON.stringify(list));

      // function to get start pulling game data to page
      gameIdFunction(gameId, gameName);
    });
  });
};

// uses gameid and name to display information to page
var gameIdFunction = function (gameId, gameName) {

  // creates url using gameid to ensure appropriate game is searched
  var apiUrlId = "https://api.rawg.io/api/games/" + gameId;

  fetch(apiUrlId).then(function (response) {
    response.json().then(function (data) {

      // makes sure game name is appropriately updated
      gameName = data.name;
      $("#gameNameDisplay").remove();

      // displays name of random game selected
      var gameNameDisplay = document.createElement("div");
      $(gameNameDisplay).attr("id", "gameNameDisplay").text(gameName);
      $("#gameNameAttach").append(gameNameDisplay);
      $("#gameNameDisplay").text(gameName);

      // checks if video is available and dynamically adds and removes element
      if (data.clip === null) {
        var resultVideoData = data.background_image;
        $("#gameVideo").remove();
        var videoFail = document.createElement("div");
        $(videoFail)
          .attr("id", "gameVideo")
          .css("background-image", `url(${data.background_image})`)
          .addClass("videoFailSize");
        $("#attachVideo").append(videoFail);
      } else {
        $("#gameVideo").remove();
        var resultVideoData = data.clip.clip;
        var video = $("<video />", {
          id: "gameVideo",
          src: resultVideoData,
          type: "vide/mp4",
          controls: true,
          width: "320",
          heigh: "240",
        });
        video.appendTo($("#attachVideo"));
      }

      // saves metacritic and user rating to variables
      var metacriticText = data.metacritic;
      var ratingText = data.rating;
      console.log(metacriticText);

      // when no metacritic score is found
      if (metacriticText === null) {
        $(".metacriticStyle")
          .addClass("bluemeta")
          .text("No Metacritic Score Found")
          .removeClass("greenmeta yellowmeta redmeta");
      } else {

        // display metacritic score
        $(".metacriticStyle").text(metacriticText);

        if (metacriticText >= 80) {
          $(".metacriticStyle")
            .addClass("greenmeta")
            .removeClass("bluemeta yellowmeta redmeta");
        } else if (metacriticText >= 60 && metacriticText <= 79) {
          $(".metacriticStyle")
            .addClass("yellowmeta")
            .removeClass("greenmeta bluemeta redmeta");
        } else {
          $(".metacriticStyle")
            .addClass("redmeta")
            .removeClass("greenmeta yellowmeta bluemeta");
        }
      }

      // if no rating score
      if (ratingText === null) {
        $(".ratingStyle")
          .addClass("bluemeta")
          .text("No User Rating Found")
          .removeClass("greenmeta yellowmeta redmeta");
      } else {
        // display rating score
        $(".ratingStyle").text(ratingText);
        if (ratingText >= 4) {
          $(".ratingStyle")
            .addClass("greenmeta")
            .removeClass("bluemeta yellowmeta redmeta");
        } else if (ratingText >= 3 && ratingText < 4) {
          $(".ratingStyle")
            .addClass("yellowmeta")
            .removeClass("greenmeta bluemeta redmeta");
        } else {
          $(".ratingStyle")
            .addClass("redmeta")
            .removeClass("greenmeta yellowmeta bluemeta");
        }
      }

      // searches for price deal using alternate api
      apiDataFunctionCheapShark(gameName);
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

      // if no deal is found display text
      if (data.length === 0) {
        $(".discountDivText").text(
          "Unable to locate a discount for " + gameName + "."
        );
        $(".discountDiv").css("background-image", "");
      } else {

        // display discount
        $(".discountDivText").text(
          "Cheapest Discount Found: $" + data[0].cheapest
        );
        $(".discountDiv").css("background-image", `url(${data[0].thumb})`);

        $(".discountDiv").on("click", function () {

          // links to cheap deal
          window.location.href =
            "https://www.cheapshark.com/redirect?dealID=" +
            data[0].cheapestDealID;
        });
      }
    });
  });
};

apiDataFunction();

// modal for searching game types
$(document).ready(function () {
  $(".modal").modal();
});

// gets data for highest rated games
var highestRatedGames = function () {

  // generates random number to show games from different generes
  var randomNumGen = Math.floor(Math.random() * 15);

  var apiHighestRated =
    "https://api.rawg.io/api/games?dates=2001-01-01," +
    dateTime +
    "&ordering=-rating";

  fetch(apiHighestRated).then(function (response) {
    response.json().then(function (data) {

      // selects top game from 5 generes
      // creates loop for highest rated data
      for (let i = 0; i < 5; i++) {
        var highestRatedCard = $("<div>")
          .addClass("cardDisplay card red")
          .attr("id", "highestRatedCard" + i);

        var highestRatedGameName = $("<div>")
          .addClass("highestRatedFormatText")
          .text(data.results[randomNumGen + i].name);

        var highestRatedGameBox = $("<div>").addClass("imageSize");

        // uses alternate image if no image is found
        if (data.results[randomNumGen + i].background_image === null) {
          var highestRatedGameOne = $("<i>")
            .addClass("material-icons iconImageFail")
            .attr("id", "highestRatedGame" + i)
            .text("stars");
        } else {
          
          // creates image for highest rated games
          var highestRatedGameOne = $("<div>")
            .addClass("highestRatedFormat")
            .attr("id", "highestRatedGame" + i)
            .css(
              "background-image",
              "url(" + data.results[randomNumGen + i].background_image + ")"
            );
        }
        $("#highestRatedGames").append(highestRatedCard);

        $(highestRatedCard).append(highestRatedGameBox);
        $(highestRatedCard).append(highestRatedGameName);
        $(highestRatedGameBox).append(highestRatedGameOne);

        // click card for highest rated section to search for game
        $("#highestRatedCard" + i).on("click", function () {
          var gameId = data.results[randomNumGen + i].id;
          gameIdFunction(gameId);
        });
      }
    });
  });
};
highestRatedGames();

$(document).ready(function () {
  $(".materialboxed").materialbox();
});

$(document).ready(function () {
  $(".tooltipped").tooltip();
});

// most ancticipated games
var anticipatedGames = function () {

  // generates random number to show games from different generes
  var randomNumGen = Math.floor(Math.random() * 15);

  // url for most anticipated games coming up to current date
  var apiAnticipated =
    "https://api.rawg.io/api/games?dates=2019-10-10," +
    dateTime +
    "&ordering=-added";

  fetch(apiAnticipated).then(function (response) {
    response.json().then(function (data) {

      // selects top game from 5 generes
      // creates loop for highest rated data
      for (let i = 0; i < 5; i++) {
        var anticipatedCard = $("<div>")
          .addClass("cardDisplay card red")
          .attr("id", "anticipatedCard" + i);

        var anticipatedGameName = $("<div>")
          .addClass("anticipatedFormatText")
          .text(data.results[randomNumGen + i].name);

        var anticipatedGameBox = $("<div>").addClass("imageSize");

        // creates alternate image for when no background image is found
        if (data.results[randomNumGen + i].background_image === null) {
          var anticipatedGameOne = $("<i>")
            .addClass("material-icons iconImageFail")
            .attr("id", "anticipatedGame" + i)
            .text("stars");
        } else {
          var anticipatedGameOne = $("<div>")
            .addClass("anticipatedFormat")
            .attr("id", "anticipatedGame" + i)
            .css(
              "background-image",
              "url(" + data.results[randomNumGen + i].background_image + ")"
            );
        }
        $("#anticipated").append(anticipatedCard);

        $(anticipatedCard).append(anticipatedGameBox);
        $(anticipatedCard).append(anticipatedGameName);
        $(anticipatedGameBox).append(anticipatedGameOne);

        // makes most ancitipated section clickable
        $("#anticipatedCard" + i).on("click", function () {
          var gameId = data.results[randomNumGen + i].id;
          gameIdFunction(gameId);
        });
      }
    });
  });
};
// loads anticipated games upon load screen
anticipatedGames();