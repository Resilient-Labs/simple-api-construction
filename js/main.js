document.querySelector('button').addEventListener('click', getWages)
trade = document.getElementById("trade");
state = document.getElementById("state");
// wage = document.getElementById

function getWages(){
    // let job = document.querySelector('input').value
    tradeCode = trade.value; 
    stateNum = state.value; 

    const url = `https://salarywiki.com/api/v1/salary?soc=${tradeCode}&area+${stateNum}`
    fetch(url)


    .then(res => res.json())
    .then(data =>{
     console.log(data)
    console.log(data.data.wages.annual.median)
        document.querySelector('h2').textContent = data.data.wages.annual.median


})

}

//getWages() 