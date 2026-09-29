document.querySelector('button').addEventListener('click',getHeat)


function getHeat(){
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&hourly=temperature_2m,precipitation_probability,wind_speed_10m&timezone=America%2FNew_York'

    fetch(url)
    .then( res => res.json())
    .then (data => {
        
        console.log(data)
        document.querySelector('.temp').textContent = data.hourly.temperature_2m[0] + 'C'
        document.querySelector('.wind').textContent = data.hourly.wind_speed_10m[0] + 'km/h'

    
    })


    .catch (err => {
        console.log(`error ${err}`)
    });
    
}


//get heat wave data 
//heat wave update
//construction temp shelters 
//with spanish 

//nyc open data powered by sora? is it free 