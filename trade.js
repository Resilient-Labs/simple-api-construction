//let apiKey = vda_8943aaf29bb8f4b3ba2253b475dda78396e8874620ef3b37918b5f17f2ddf7b2

document.querySelector('#tradeBtn').addEventListener('click',getTrades)
//document.querySelector('#carBtn').addEventListener('click',getCarDetails)

function getTrades(){
let trade = document.querySelector('select[name = trades]').value
//let carMake = document.querySelector('#makeInput').value
fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=83e28d4d&app_key=1c11af43d6dded258714dee904e78722&what=${trade}`)
.then(res=> res.json())
.then(data => {
  console.log(data)
  let job1= data.results[0].title
  let job2= data.results[1].title
  let job3= data.results[2].title
  let job4=data.results[3].title
  let job5=data.results[4].title
  let job6=data.results[5].title
  let job7=data.results[6].title
  let job8=data.results[7].title
  let job9=data.results[8].title
  let job10=data.results[9].title

let salary1=data.results[0]['salary_max']
let salary2=data.results[1]['salary_max']
let salary3=data.results[2]['salary_max']
let salary4=data.results[3]['salary_max']
let salary5=data.results[4]['salary_max']
let salary6=data.results[5]['salary_max']
let salary7=data.results[6]['salary_max']
let salary8=data.results[7]['salary_max']
let salary9=data.results[8]['salary_max']
let salary10=data.results[9]['salary_max']

let location1=data.results[0].location.area[1]
let location2=data.results[1].location.area[1]
let location3=data.results[2].location.area[1]
let location4=data.results[3].location.area[1]
let location5=data.results[4].location.area[1]
let location6=data.results[5].location.area[1]
let location7=data.results[6].location.area[1]
let location8=data.results[7].location.area[1]
let location9=data.results[8].location.area[1]
let location10=data.results[9].location.area[1]


  document.querySelector('#firstJob').innerText = `Title:`+job1
  document.querySelector('#salaryOne').innerText = `Salary:$`+salary1
  document.querySelector('#locOne').innerText = `Location:`+location1
  document.querySelector('#secondJob').innerText= `Title:`+job2
  document.querySelector('#salaryTwo').innerText = `Salary:$`+salary2
  document.querySelector('#locTwo').innerText = `Location:`+location2
  document.querySelector('#thirdJob').innerText = `Title:`+job3
  document.querySelector('#salaryThree').innerText = `Salary:$`+salary3
  document.querySelector('#locThree').innerText = `Location:`+location3
  document.querySelector('#fourthJob').innerText= `Title:`+job4
  document.querySelector('#salaryFour').innerText = `Salary:$`+ salary4
  document.querySelector('#locFour').innerText = `Location:`+location4
  document.querySelector('#fifthJob').innerText= `Title:`+job5
  document.querySelector('#salaryFive').innerText = `Salary:$`+ salary5
  document.querySelector('#locFive').innerText = `Location:`+location5
  document.querySelector('#sixthJob').innerText= `Title:`+job6
  document.querySelector('#salarySix').innerText = `Salary:$`+ salary6
  document.querySelector('#locSix').innerText = `Location:`+location6
  document.querySelector('#seventhJob').innerText= `Title:`+job7
  document.querySelector('#salarySeven').innerText = `Salary:$`+ salary7
  document.querySelector('#locSeven').innerText = `Location:`+location7
  document.querySelector('#eighthJob').innerText= `Title:`+job8
  document.querySelector('#salaryEight').innerText = `Salary:$`+ salary8
  document.querySelector('#locEight').innerText = `Location:`+location8
  document.querySelector('#ninthJob').innerText= `Title:`+job9
  document.querySelector('#salaryNine').innerText = `Salary:$`+ salary9
  document.querySelector('#locNine').innerText = `Location:`+location9
  document.querySelector('#tenthJob').innerText= `Title:`+job10
  document.querySelector('#salaryTen').innerText = `Salary:$`+ salary10
  document.querySelector('#locTen').innerText = `Location:`+location10








})
.catch(err => {
  console.log(`error is ${err}`)
})
}









// //array string number boolean objects and other array

// let arr = ['hey',2,true]

// //objects

// let obj = {
//   name : 'Cameron',
//   program:'RC',

// }
// console.log(obj.name)

// //4 ways of creating an object

// //object literal hardcoding an object. small numbers of object when ywe know exactly what we are making

// let person = {
//   name:'Cameron',
//   age:16,
// }
// console.log(obj.name)

// //constructor functions. when we want to create many objects, many people

// function Person(name,age){
//   this.name = name
//   this.age
// }
// const person1 = new Person('Cameron', 21) //this is an instance
// const person2 = new Person('Kelvin',14)// this is also an instance
// s
// console.log(person1)

// //classes. the modern way of doing objects in jsx. same as constructor but looks nicer for people foreign to JS

// class Person {
//   constructor(name,age){
//     this.name = name
//     this.age = age
//   }
//   greet(){
//     console.log(`Hello ${this.name}!`)
//   }
// }

// const person01 = new Person('Erick',54)
// const person02 = new Person('Kat',32)

// //object literal

// const animal = {
//       noise(){
//         console.log('Animal sound')
//       }
// }

// //creating an object from an object.Creating an object with Object.create
// let dog= Object.create(animal)
// let cat= Object.create(animal)


// //Polymorphism examples.original method value was overwritten but they both have the same method
// dog.noise = ()=> console.log('Woof!')
// cat.noise = ()=> console.log('Meow!')

// //Object Oriented Programming
// //Organizing your code around objects
// //OOP is organizing your code around objects. We know objects can hold two things: data and behavior. So instead of organizing code through functions and variables, we use relationships around objects.

// class ShoppingCart{
//   constructor (user){
//     this.user = user
//     this.items = []
//   }
//   addItems(name,price){
//     this.items.push({
//       name: name,
//       price:price,
//     })
//     return `${name} got add to cart`
//   }
//   removeItems(name){
//     this.item = this.items.filter(item => item.name !== name)
//     //[{'shoes',100}, {'hoodie',40}, {'jeans',50}]
// //The first item it looks at is 'shoes' 100, lets pretend user gives item name 'jeans'
// //i[0] = item = {'shoes',100}; item.name = 'shoes' !== 'jeans'; true, if its's true the item stays in the new array
// //i[1] = item = {'shoes',40}; item.name = 'shoes' !== 'hoodies'; true, if its's true the item stays in the new array
// //i[2] = item = {'jeans',50}; item.name = 'shoes' !== 'hoodies'; false, in this case the item will not be added to the new array
//   }
//   getTotal(){
//     this.items.reduce((accmulator,item)=> accmulator + item.price,0)
//   }
  
// }

// const EricksCart = new ShoppingCart('Erick')




// EricksCart.addItems('shoes',100)













