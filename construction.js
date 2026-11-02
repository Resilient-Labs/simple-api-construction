apiKey = '2d3d1f28-c4aa-487d-9252-161945b3ff9c';

document.querySelector('button').addEventListener('click', getPermits);

function getPermits() {
  const inputZip = document.querySelector('input').value;
  console.log(inputZip);

  const url = `https://data.cityofnewyork.us/resource/ipu4-2q9a.json`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const modified = data.filter((element) => element.zip_code === inputZip);
      console.log(modified);

      modified.map((listing) => {
        const permitsDisplay = document.querySelector('#building-permits');
        const buildingInfo = document.createElement('h2');
        const permiteeInfo = document.createElement('h3');

        buildingInfo.textContent = `Construction resides at ${listing.house__} ${listing.street_name} in ${listing.gis_nta_name}`;
        permiteeInfo.textContent = `Permit was granted to ${listing.owner_s_business_name} on ${listing.issuance_date}`;

        permitsDisplay.appendChild(buildingInfo);
        permitsDisplay.appendChild(permiteeInfo);
      });
    });
}
