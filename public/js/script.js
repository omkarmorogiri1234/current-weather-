let weather = {  
    "apiKey": "e2c1d873e17655abe9c9bdf6946db59d",  
    fetchWeather: function (city) {  
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid="+ this.apiKey)  
      .then((response)=>response.json())  
      .then((data)=>this.weatherForeCast(data));  
    },  
    weatherForeCast: function (data) {  
      const {name}=data;  
      const {temp,humidity}=data.main;  
      document.querySelector(".city").innerText="Weather in " + name;  
      document.querySelector(".temp").innerText=temp + "°C";  
      document.querySelector(".humidity").innerText="Humidity: "+humidity+"%";  
    },  
    search: function () {  
      this.fetchWeather(document.querySelector(".search-bar").value);  
    }  
  };  



  
  document.querySelector(".search button").addEventListener("click", function () {  
    weather.search();    
  });  
  document.querySelector(".search-bar").addEventListener("keyup",function(event) {  
    if (event.key=="Enter") {  
      weather.search()  
    }   
  });  


  var array = Array();
            
  function test(){
  b1=document.getElementById('ci').value;
  array.push(b1);
  document.getElementById('ci').value='';
  }

  function disp(){
  
      var temp='' 

      for(var i=0;i<array.length;i++){
          temp += array[i] + '<br>' ;
      }

      document.getElementById('Result').innerHTML = temp;

  }
