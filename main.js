// Goal: Build a simple front-end app that displays data returned from an api that would be beneficial to someone in the trades (construction, hvac, plumbing, ect)
document.querySelector('button').addEventListener('click', LookUp)

  function LookUp(){
        const zipcode = document.querySelector('input').value
        // const trades = document.querySelector('Dashboard').value.tolowerCase
        const url =`https://estimationpro.ai/api/v1/costs?trade=roofing&zip=${zipcode}`
        // console.log(inputVal)

        fetch(url)
        .then(res => res.json())
        .then((planted) => {
            console.log(planted)
            document.querySelector('h1').textContent = planted.data.trade
            document.querySelector('h2').textContent = planted.data.location
            document.querySelector('p').textContent = planted.data.items[5].description
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

    }

    
    