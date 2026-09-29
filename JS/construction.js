//Test to see if my JavaScript file is connected:
console.log("JS file is connected")

// In our HTML-doc, find the search button and click it. 
document.querySelector('#searchBtn').addEventListener('click', licensedPermits);

//This is the function that will run upon our clickes for a Licensed Permit. 
function licensedPermits() {

    //Declaring a new variable name (location). When you find it, click this button and return the value of that cliked button.
    const location = document.querySelector('#location').value;

    //API URL: for the CitofSeattle's API's Building Permits. 
    const apiUrl = `https://data.seattle.gov/resource/76t5-zqzr.json?originalzip=${location}&$limit=10`;

    //fetching the data from the URL: 
    fetch(apiUrl)
        //First response: It takes a while to return from the server, so it's making  promise to return the infromation. But to return to me the data to me in json-formation(which is a format that is readible by the computer). 
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Find the section where our permits will be displayed. 
            const permitResults = document.querySelector('.bobTheBuilder');


            // Clear the previous search. 
            permitResults.innerHTML = '';


            // Loops through every permit returned.
            data.forEach(permit => {

                permitResults.innerHTML += `
                    <div class="permit">

                        <h3>${permit.originaladdress1}</h3>

                        <p>Permit Number: ${permit.permitnum}</p>

                        <p>Permit Class: ${permit.permitclass}</p>

                        <p>Status: ${permit.statuscurrent}</p>

                        <p>Description: ${permit.description}</p>

                        <p>Date: ${permit.issueddate}</p>

                    </div>`;
                // In the h3 above, give me the permit's address. 
                //in p-tag, give me the permit number, the permit class, the status, description and the date of the permits based on this zipcode/location. 

            });
        })

        //Catches any errors in my code. 
        .catch(err => {
            console.log(`error & ${err}`)
        })
}
