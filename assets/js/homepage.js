var apiDataFunction = function() {


    var apiUrl =  "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
    

    
    fetch(apiUrl).then(function(response){
    response.json().then(function(data){
        console.log(data)
    })})
    
    };

    var apiDataFunctionTwo = function() {


        var apiUrlTwo =  "https://api.rawg.io/api/games?page_size=5&search=gta%20v"
        
        
    
        
        fetch(apiUrlTwo).then(function(response){
        response.json().then(function(data){
            console.log(data)
        })})
        
        };
    
    apiDataFunction();
    apiDataFunctionTwo();