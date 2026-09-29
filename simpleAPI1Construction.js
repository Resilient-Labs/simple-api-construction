const costs = document.getElementById("ID");
const search = document.getElementById("search");
const description = document.getElementById("description");

let data = [];

fetch("https://estimationpro.ai/api/v1/costs?trade=roofing")
  .then(response => response.json())
  .then(result => {

    data = result.data.items

    data.forEach(item => {

      console.log(item.id)
      console.log(item.description)

      ID.innerHTML += `<option value="${item.id}">${item.id}</option>`
    })

  })


search.addEventListener("click", function() {

  const item = data.find(item => item.id == ID.value)

  description.textContent = item.description

});