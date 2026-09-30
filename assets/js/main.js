//Base URL: https://estimationpro.ai/api/v1/
//Useful Endpoint: https://estimationpro.ai/api/v1/index

document.querySelector("button").addEventListener("click", projectCost)

function projectCost(){

    const zipcode=document.querySelector("input").value
    const trade=document.querySelector(".trade").value
    const url=`https://estimationpro.ai/api/v1/costs?trade=${trade}&zip=${zipcode}`

    fetch(url)
    .then(res => res.json())
    .then(opt => {
            console.log(opt)
            
            const location=opt.data.location
            const description=opt.data.items[0].description
            const lowCost=opt.data.items[0].low
            const averageCost=opt.data.items[0].typical
            const highCost=opt.data.items[0].high
            const unit=opt.data.items[0].unit
            
            document.querySelector('h2').textContent=location
            document.querySelector("h3").textContent=description
            document.querySelector('.lowCost').textContent="Low: "+"$"+lowCost+" per "+unit
            document.querySelector('.averageCost').textContent="Average: "+"$"+averageCost+" per "+unit
            document.querySelector('.highCost').textContent="High: "+"$"+highCost+" per "+unit
    })
        
    .catch(err => {
        console.log(`error ${err}`)
    })
}