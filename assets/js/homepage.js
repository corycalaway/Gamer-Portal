var apiDataFunction = function() {


    var apiUrl =  "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
    

    
    fetch(apiUrl).then(function(response){
    response.json().then(function(data){
        console.log(data)
    })})
    
    };

    var apiDataFunctionTwo = function() {


       // var apiUrlTwo =  "https://api.rawg.io/api/platforms?key=f58ccbebc042468c979cde0ac7353b65"
       // fetches data for anticipated 2020 games
       var apiUrlTwo =  'https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added?key=f58ccbebc042468c979cde0ac7353b65'
        
        //f58ccbebc042468c979cde0ac7353b65

    
        
        fetch(apiUrlTwo).then(function(response){
        response.json().then(function(data){
            console.log(data)
        })})
        
        };
    
    //apiDataFunction();
    apiDataFunctionTwo();

    // modal for searching game types
    $(document).ready(function(){
        $('.modal').modal();
      });

      //https://corycalaway.github.io/gamer-portal/