// API to help HVAC Technician explain real local electricity prices to a customer.
// Will help show how much electricity a system uses per month. kWh * rate(api retrieves) = monthly cost


document.querySelector('#location').addEventListener('click', getLocation);

function getLocation(){

    const city = document.querySelector('.city').value;

    const stateCo = document.querySelector('.state').value;

    const apiKeyOne = 'f9f5cceab2634a95ac69efc11e0cd6ca';

    const apiOne =  `https://api.opencagedata.com/geocode/v1/json?q=${city},${stateCo}&key=${apiKeyOne}`

    fetch(apiOne)
        .then(res => res.json())
        .then(data => {
            console.log(data)


            const long = data.results[0].geometry.lng
            const lati = data.results[0].geometry.lat

            electricityRate(long, lati)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

}

function electricityRate(long, lati){

    const apiKeyTwo = 'BgI9lsw3lK08gNPbiXLfwVSPYO6hW5Is4kHX6dW1';
    
    const url = `https://developer.nlr.gov/api/utility_rates/v3.json?api_key=${apiKeyTwo}&lat=${lati}&lon=${long}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // Value of dropdown option chosen goes to customerType
            // elecRate becomes whichever of the three values selected 

            const utilityCo = data.outputs.utility_name
            customerRate(data.outputs, utilityCo);
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

}

function customerRate(elecRate, utilityCo){

    document.querySelector('#kWhBtn').addEventListener('click', customerQuote);
    
    function customerQuote(){

        const customerType = document.querySelector('#customerType').value;
        const customerRate = elecRate[customerType];
        document.querySelector('#utilityCo').innerText = utilityCo;

        const watts = Number(document.querySelector('#watts').value);
        const hours = Number(document.querySelector('#hours').value);

        const kWh = watts * hours / 1000;
        const dailyCost = kWh * customerRate;
        const weeklyCost = dailyCost * 7;
        const monthlyCost = dailyCost * 30;
        const yearlyCost = dailyCost * 365;

        document.querySelector('#dailyCost').innerText = `${dailyCost.toFixed(2)}`;      // add toFixed() round to the nearest integer
        document.querySelector('#weeklyCost').innerText = `${weeklyCost.toFixed(2)}`;    // add toFixed with a param of (2) for number fo decimal places 
        document.querySelector('#monthlyCost').innerText = `${monthlyCost.toFixed(2)}`;
        document.querySelector('#yearlyCost').innerText = `${yearlyCost.toFixed(2)}`;
    }

}