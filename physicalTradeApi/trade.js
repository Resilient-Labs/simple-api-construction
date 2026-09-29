
document.querySelector('button').addEventListener('click',vehicle)
function vehicle() {
    const userInput = document.querySelector('input').value
   fetch(`https://vpic.nhtsa.dot.gov/api//vehicles/DecodeVinValuesExtended/${userInput}?format=json`)
.then(res => res.json())
.then(data =>{
    console.log(data)
    console.log(data.Results)
    console.log(data.Results[0].EngineManufacturer)
    console.log(data.Results[0].EngineModel)
    console.log(data.Results[0].ModelYear)
    // Manufacturer
    document.querySelector('.manu').innerText = 'Manufacturer: ' + data.Results[0].Manufacturer
    // Model year
    document.querySelector('.model').innerText = 'Model Year: ' + data.Results[0].ModelYear
    // FuelType
    document.querySelector('.fuel').innerText = 'Fuel Type: ' + data.Results[0].FuelTypePrimary
    // engine manufacturer
    document.querySelector('.engine').innerText = 'Engine Manufacturer: ' + data.Results[0].EngineManufacturer
    // Engine Model
    document.querySelector('.engModel').innerText = 'Engine Model: ' + data.Results[0].EngineModel
}) 
}
