
//const config={apiKey:`${weather.env.WEATHER_API_KEY}`}


document.getElementById("search").onclick=getInformation;

function getInformation()
{
    let obtenerInfo = document.getElementById('zip-code').value
    console.log(obtenerInfo)
    const selectPermitType = document.getElementById('permited-type').value;
    const sql = `SELECT * FROM permits WHERE zip LIKE '${obtenerInfo}%' limit 50`
   
    const url = `https://phl.carto.com/api/v2/sql?q=${encodeURIComponent(sql)}`
    fetch(url)
        .then((res) => res.json()) // parse response as JSON
         //object
        .then((data) => {
            //permited types set deleted duplicates
            console.log(data.rows)
            if(obtenerInfo!=='')
            {
                let html='';
                let htmlVacio='';
                data.rows.forEach(elemento=>
                {
                    console.log(selectPermitType)
                    if(elemento.permittype === selectPermitType && elemento.status==='Issued')
                    {
                        html+=`<section class="box">
                                    <h3 id="permite-type">${elemento.permittype.toUpperCase()}</h3>
                                    <section class="details">
                                        <h4 class="campo">ISSUE DATE</h4>
                                        <h4 id="issue-date" class="valor">${elemento.permitissuedate}</h4>
                                    </section>	
                                    <section class="details">
                                        <h4 class="campo">PERMIT ID</h4>
                                        <h4 id="permit-number" class="valor">${elemento.permitnumber}</h4>
                                    </section>	
                                    <section class="details">
                                        <h4 class="campo">RESIDENTIAL / COMERCIAL</h4>
                                        <p id="residential-comercial" class="valor">${elemento.commercialorresidential}</p>
                                    </section>	
                                    <section class="box-not-completed">
                                        <h5 id="not-completed">WHY THIS MAY MATTER</h5>
                                        <p>Macthes your select trade - Recent permit record</p>
                                        <p>Not marked as completed</p>
                                    </section>
                                    <section class="details">
                                        <h4 class="campo">PROJECT OF SCOPE / DESCRIPTION</h4>
                                        <p id="approved-of-scope" class="valor">${elemento.approvedscopeofwork}</p>
                                    </section>	
                                    <buttom class="guardar">SAVE</buttom>
                                    <dialog id="toast">
                                        ¡Save successful!
                                    </dialog>
                                </section>`
                        document.querySelector('.container-list').innerHTML=html;
                        console.log(elemento.permitnumber)
                        console.log(elemento.permitissuedate)
                        console.log(elemento.permitcompleteddate)
                        console.log(elemento.approvedscopeofwork)
                        console.log(elemento.commercialorresidential)
                    // console.log(elemento.status)
                    }
                })
            }else{
                alert('You need to add a zip code')
            }
            //const groupByType = [...new Set(data.rows.map(prop => prop.permittype))];
            //groupByType.forEach(type=>{
            //    const option = document.createElement('option')
            //    option.value = type;
            //    option.textContent=type;
            //    select.appendChild(option)
            //    data.rows.forEach(element => {
            //        console.log(element.permitissuedate)
            //    });
            //})
              
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

document.querySelector(".guardar").onclick=saveList;

function saveList(){
    console.log('click')
      const toast =document.getElementById('toast');
    toast.show();
    setTimeout(()=>{
        toast.closest();
    },2000);
}

//else{
// htmlVacio+=`
// <section class="card">
  /// <h5>NO PERMITS FOUND</h5>
//<p class="valor">Try adjusting your work category or checking a different ZIP code</p>
// <span>SEARCH AGAIN</span>
//</section>
// `;
//document.querySelector('.container-list').innerHTML=htmlVacio;
// }