//** Step One: What would be useful to a construction company?
//based on the Open Data I found, they could find new customers (mb the DOB based on which projects were halted or stopped; complaints based. they can also view the status and complaints for their current projects)
// **/ 
 

//NYC Open Data: Active Projects - Public Buildings Historical https://data.cityofnewyork.us/resource/g9ub-hrve.json
//NYC Open Data: Capital Project Schedules and Budgets https://data.cityofnewyork.us/resource/2xh6-psuq.json

//you need a button to click in the global scope. do you have a button in your html? how is the user interacting with this? 
//document.querySelector('button').addEventListener('click', getComplaints)

//this function's role is to get the complaints for the user when the button is clicked. 

//getComplaints = () => {
//these are the instructions that run when the button is clicked 


//test with Postman: it returns data 
// url="https://data.cityofnewyork.us/resource/i296-73x5.json"

//get the button working
document.querySelector('button').addEventListener('click', getComplaints)
 //url="https://data.cityofnewyork.us/resource/i296-73x5.json" moved to within the function


//this is the function that holds the instructions to execute when the user presses the button. the smurf listens for the click and this is what you get. 
function getComplaints() {

    const boroughInput = document.querySelector('#userBoroughInput').value.trim().toLowerCase()
    
    const streetInput = document.querySelector('#userStreetInput').value.trim().toLowerCase()

    const url="https://data.cityofnewyork.us/resource/i296-73x5.json"

    //successful fetch; now allow user to select by borough: borough_name
    fetch(url)
    .then(res => res.json())
    .then(data => {

        console.log(data)

        //How can it find the complaint that the user is looking for? How is it going to display anything? Swabira's complex also had problem where if there was no result, nothing would show up for the user. make the user has feedback if it did not find anything. 
        const findTheUsersComplaint = data.find(complaint => {
                    const siteFullAddress = `${complaint.house_number} ${complaint.street_name}`.toLowerCase()

                    return complaint.borough_name.toLowerCase() === boroughInput && siteFullAddress.includes(streetInput)
                })
            
            //start using syntax you have been learning and reading about - > ! operator indicates a NOT. mdn methods .find() 
            if(!findTheUsersComplaint) { //same thing as matchingComplaint === undefined
                document.querySelector('.userDisplayBorough').innerText = 'No complaint found for this address.'
                document.querySelector('.userBIN').innerText = ' '
                document.querySelector('.userDisplayComplaintDate').innerText = ' '
            return 
    }


    //Show the user the street address
    document.querySelector('.userDisplayBorough').innerText = `${findTheUsersComplaint.borough_name} - ${findTheUsersComplaint.house_number} ${findTheUsersComplaint.street_name}`

    //show the user the BIN and complaint number 
    document.querySelector('.userBIN').innerText = `BIN: ${findTheUsersComplaint.bin}. Here is the Complaint Number: ${findTheUsersComplaint.complaint_number}`

    //when outputting to the user it looks like this: 2012-04-30T00:00:00.000
    //how would i get this to look normal? think through what is being displayed here. is there any part of this that you want? 2012-04-30 
    //recall your methods? 
    document.querySelector('.userDisplayComplaintDate').innerText = `Date the Complaint was Received: ${findTheUsersComplaint.date_complaint_received.slice(0,10)}`

    // document.querySelector('.userBIN').innerText = ' '
   // document.querySelector('.userDisplayComplaintDate').innerText = findTheUsersComplaint.date_complaint_received
    // document.querySelector('.userBoroughInput').input.value = data[0].borough_name
    // document.querySelector()

    console.log(data)
})

.catch(err => {
    console.log(`error: ${err}`)
})
}





