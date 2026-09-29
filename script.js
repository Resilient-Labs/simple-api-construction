document.querySelector('button').addEventListener('click', getMeasurementbutton)

function getMeasurementbutton() {

    const url = "https://unitswapper.net/api/v1/convert"

    let from = document.querySelector('.from').value
    let to = document.querySelector(".to").value
    let number = document.querySelector('input').value

    fetch(`https://unitswapper.net/api/v1/convert?from=${from}&to=${to}&value=${number}`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)
            document.querySelector('h2').innerText = data.result
            document.querySelector('p').innerText = data.formula
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}
