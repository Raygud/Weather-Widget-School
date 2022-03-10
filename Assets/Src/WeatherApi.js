let Rain = document.getElementById("Rain")
let Temp = document.getElementById("DayTemp")
let Humidity = document.getElementById("Humidity")
let Wind = document.getElementById("Wind")
let CurrentIcon = document.getElementById("CurrentIcon")
let City = document.getElementById("City")
let Description = document.getElementById("WeatherDescription")
let GraphTemp = document.getElementById("GraphTemp")
let Switch = true
let Time = new Date();
let TimeWrite = document.querySelectorAll("#TimeLine li")
let Hour = Time.getHours()
let a = 1
x = 3



function getGeoLocation() {
    // Navigator is your browser. 
  navigator.geolocation.getCurrentPosition(success => {
    let { latitude, longitude } = success.coords;
    console.log(latitude, longitude)
    getWeatherData(latitude, longitude)
    // Navigator can give you alot of different information about what browser the user is using(What is he using too navigate the web)
    console.log(navigator.platform + " " + navigator.userAgent) //This will give us the machine the user is on.
  });
}

getGeoLocation()





// FETCH
let errorCountAmountOfTryies = 0;

async function getWeatherData(latitude, longitude) {
  // &units=metric
  const unit = "metric";
  const API_KEY = "dcf74a579d1a7bdab77b86e3da8f7ac3";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&units=${unit}&appid=${API_KEY}`;
  
  TimeWrite[0].innerHTML = Hour
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    for (let i = 0; i < 7; i++) {

        Hour + x
    console.log(Hour + x)
    TimeWrite[a].innerHTML = Hour + x
    x = x+3
    if(Hour+x >= 24){
        console.log("h")
        Hour = -24 + x
        TimeWrite[a].innerHTML = Hour + x
        a++
       
    }
    a++
    console.log(a)
      document.getElementById("Temp"+i).innerHTML = Math.round(data.hourly[i].temp) + "°C"
    }


    
    GraphTemp.setAttribute("d","M0,100 L16.5,"+(100-data.hourly[0].temp*4)+"L33,"+(100-data.hourly[1].temp*4)+"L49.5,"+(100-data.hourly[2].temp*4)+"L66,"+(100-data.hourly[3].temp*4)+"L82.5,"+(100-data.hourly[4].temp*4)+"L99,"+(100-data.hourly[5].temp*4)+"L115.5,"+(100-data.hourly[6].temp*4)+"L132,"+(100-data.hourly[7].temp*4)+"L148.5,"+(100-data.hourly[8].temp*4)+"L165,"+(100-data.hourly[9].temp*4)+"L181.5,"+(100-data.hourly[10].temp*4)+"L198,"+(100-data.hourly[11].temp*4)+"L214.5,"+(100-data.hourly[12].temp*4)+"L231,"+(100-data.hourly[13].temp*4)+"L247.5,"+(100-data.hourly[14].temp*4)+"L264,"+(100-data.hourly[15].temp*4)+"L280.5,"+(100-data.hourly[16].temp*4)+"L297,"+(100-data.hourly[17].temp*4)+"L313.5,"+(100-data.hourly[18].temp*4)+"L330,"+(100-data.hourly[19].temp*4)+"L346.5,"+(100-data.hourly[20].temp*4)+"L363,"+(100-data.hourly[21].temp*4)+"L379.5,"+(100-data.hourly[22].temp*4)+"L396,"+(100-data.hourly[23].temp*4)+"L399,100z") 

    CurrentIcon.setAttribute("href","#" + data.current.weather[0].main)
    Temp.innerHTML = Math.round(data.current.temp) + "°C"
    Rain.innerHTML = "Rain: " + data.daily[0].rain + "mm"
    Wind.innerHTML = "Wind: " + data.current.wind_speed + "m/s"
    Description.innerHTML = data.current.weather[0].description
    City.innerHTML = data.timezone
  } catch (error) {
    // RETRY FETCH
    if (errorCountAmountOfTryies < 3) {
      getWeatherData();
      //   console.log(errorCountAmountOfTryies);
      errorCountAmountOfTryies++;
    }
    console.log("whoops, something went wrong!", error);
  }
}


