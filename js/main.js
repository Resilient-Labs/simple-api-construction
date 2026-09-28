 //alert('works')
//https://dev.socrata.com/foundry/data.cityofnewyork.us/rbx6-tga4?utm
//https://data.cityofnewyork.us/api/v3/views/rbx6-tga4/query.json?pageNumber=1&pageSize=10&app_token=$YOUR_APP_TOKEN
//https://apidocs.geoapify.com/docs/place-details/
//https://data.cityofnewyork.us/api/v3/views/8586-3zfm/query.json
//https://dev.socrata.com/docs/functions/#3.0,
//  const url = `https://data.cityofnewyork.us/api/v3/views/rbx6-tga4/query.json?pageNumber=1&pageSize=10&zip=${zip}&borough=${borough}`
 //https://data.cityofnewyork.us/api/v3/views/rbx6-tga4/query.json?pageNumber=1&pageSize=10&app_token=$YOUR_APP_TOKEN&query=SELECT%20*%20WHERE%20%60borough%60%3D'${borough}'
  
document.querySelector('#submit').addEventListener("click", getProjects)

function getProjects () {
    event.preventDefault();
    // const zip = document.querySelector('.zip').value
    const borough = document.querySelector('.boroughs').value.toUpperCase()

  const url = `https://data.cityofnewyork.us/api/v3/views/rbx6-tga4/query.json?pageNumber=1&pageSize=10&query=SELECT%20*%20WHERE%20%60borough%60%3D'${borough}'`

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // let searchResults

      // if (zip) {
      //   searchResults = data.filter(searchResults => searchResults.zip_code === zip)
      // } else if (borough) {
      //   searchResults = data.filter(searchResults => searchResults.borough === borough)
      // }
      // console.log(searchResults);
      
      // const randomArray = searchResults[Math.floor(Math.random() * searchResults.length)];
      // console.log(randomArray);


      document.querySelector(".Oboroughs").innerHTML = data[0].borough
      document.querySelector(".OZipcode").innerHTML = data[0].zip_code
      document.querySelector(".Oowner_name").innerHTML = data[0].owner_name
      document.querySelector(".Obusiness_name").innerHTML = data[0].owner_business_name
      document.querySelector(".Ojob_description").innerHTML = data[0].job_description
      document.querySelector(".Owork_type").innerHTML = data[0].work_type
      

            
    })
    .catch(error => {
      console.log(error);
    })
  }
