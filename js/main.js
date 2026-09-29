
// select the input
const jobSite = document.querySelector("#city")

// select each job types below
const selectVal = document.getElementById("job-type")

// select the container for the result of data/weather
    const statusofDay= document.querySelectorAll(".status")  
    const month = document.getElementById("month")


// cards Container
const cards = document.querySelector("#card")


// button for fetching the forecast
const getForeCastBtn = document.querySelector("button").addEventListener("click",getGeoCodeForCity)


// pass city and get the lang and long to pass it to api
function getGeoCodeForCity(){
    let city = jobSite.value
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        if(!data.results)
            return

        // destructure latitude and longitude
        const { latitude , longitude } = data.results[0]
        getWeatherData(latitude,longitude)
    })
}

// pass this long and latitude to tha open metreo api 
function getWeatherData(lat,long){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_mean,windgusts_10m_max&wind_speed_unit=mph&timezone=auto`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      displayResult(data)
    })
}

// function to decide a status
function getStatusForDay(job,tempMin,tempMax,rain,humidity,wind){

    // pour concrete
    if(job==="pour"){
        if(tempMin<35 || rain>40) return "NO"
        if(tempMin<40 || rain>=20) return "MAYBE"
        return "GO"
    }

    // paint
    if(job==="paint"){
        if(tempMin<45 || tempMax>95 || rain>40 || humidity>90) return "NO"
        if(tempMin<50 && tempMin>90 || rain>=20 || humidity>85) return "MAYBE"
        return "GO"
    }

    // roofing
     if(job==="roofing"){
        if(tempMin<35 && rain>30) return "NO"
        if(tempMin<40 || rain>=20) return "MAYBE"
        return "GO"
    }

     // Cane
     if(job==="crane-lift"){
        if(wind>25 && rain>60) return "NO"
        if(wind>=20 || rain>=40) return "MAYBE"
        return "GO"
     }
}


// function to show result  of the staus based on the getStausFunction
function displayResult (data){

    // get the val from the select
      const job = selectVal.value;

      // access the max , min temeperature and precipitation
        const temperatureMax = data.daily.temperature_2m_max
        const temperatureMin = data.daily.temperature_2m_min
        const precipitationMax = data.daily.precipitation_probability_max
        const humidity = data.daily.relative_humidity_2m_mean
        const dates = data.daily.time
        const gusts = data.daily.windgusts_10m_max
        
        // convert them to  to fahranheit then map to create a new array of Numbers fixed to 1 decimal place 
        const mappedTempMax = temperatureMax.map((value)=>Number(((value * 1.8) + 32).toFixed(1)))
        const mappedTempMin = temperatureMin.map((value)=>Number(((value * 1.8) + 32).toFixed(1))) 


        // empty the cards so that they willnt be appended
        cards.innerHTML = ""
      
      // loop for creating 5 days and use card function to create them
      for(let i=1;i<=5;i++){
        
        // passing values to the function whcih determines the status
        const stat = getStatusForDay(
            job,
            mappedTempMin[i],
            mappedTempMax[i],
            precipitationMax[i],
            humidity[i],
            gusts[i]
        )
   

        // adding the values to createCard
        cards.innerHTML+=createCardsForEachDay(
            dates[i],
            mappedTempMin[i],
            mappedTempMax[i],
            stat, 
            precipitationMax[i],
          
        )
      }
}

// this function will create a card for each days 

function createCardsForEachDay(date,minTemp,maxTemp,status,precipitation){
const datee = new Date(date)

// used toLocalDateString to convert the numbers i get from the date to map to dayname and month
// weekDay long give the full dayName such as Friday rather than fri
    const dayName = datee.toLocaleDateString('en-US',{weekday:"long"}) 
    const month = datee.toLocaleDateString('en-US',{month:"long"}) // jan-dec 
    const dayNumber = datee.getDate()


// return the html struture 
// each will have this card
    return `
    <div class="card">
    <h2 class="day">${dayName}</h2>
    <span class="month">${month}</span>
    <span id="date">${dayNumber}</span>
    <p class="status ${status.toLowerCase()}">${status}</p>
    <span id="max-temp"><strong>Max Temperature</strong> : ${maxTemp}</span>
    <span id="min-temp"> <strong>Min Temperature </strong>: ${minTemp}</span>
    <h4 class="precipitation"><strong>Precipitation </strong> :  ${precipitation}</h4>
    </div>
`
}

