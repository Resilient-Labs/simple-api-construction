document.getElementById('find').addEventListener('click', pullReport)

function pullReport() {

    const make = document.querySelector('#vehicle-make').value
    const model = document.querySelector('#vehicle-model').value
    const year = document.querySelector('#vehicle-year').value

    const url = `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${model}&modelYear=${year}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const recallResults = document.querySelector('#recall-results')

            recallResults.innerText = ''

            data.results.forEach(recall => {

                //create one section for a recall
                const recallSection = document.createElement('section')
                recallSection.classList.add('recall-card')

                //summary
                const summaryHeading = document.createElement('h2')
                summaryHeading.innerText = 'Recall Summary'
                const summary = document.createElement('p')
                summary.innerText = recall.Summary
                recallSection.appendChild(summaryHeading)
                recallSection.appendChild(summary)

                //faulty component
                const componentHeading = document.createElement('h3')
                componentHeading.innerText = 'Faulty Component'
                const component = document.createElement('p')
                component.innerText = recall.Component
                recallSection.appendChild(componentHeading)
                recallSection.appendChild(component)

                //consequence
                const consequenceHeading = document.createElement('h3')
                consequenceHeading.innerText = 'Consequence'
                const consequence = document.createElement('p')
                consequence.innerText = recall.Consequence
                recallSection.appendChild(consequenceHeading)
                recallSection.appendChild(consequence)

                //remedy
                const remedyHeading = document.createElement('h3')
                remedyHeading.innerText = 'Remedy'
                const remedy = document.createElement('p')
                remedy.innerText = recall.Remedy
                recallSection.appendChild(remedyHeading)
                recallSection.appendChild(remedy)

                recallResults.appendChild(recallSection)
            })



            // const recallSummary = document.querySelector('#recall-summary') //put the recall summary action into a variable
            // const faultyComponent = document.querySelector('#fault-details')
            // const consequence = document.querySelector('#consequence')
            // const remedy = document.querySelector('#remedy')

            // recallSummary.innerText = '' //clear old results when new results are delivered
            // faultyComponent.innerText = ''
            // consequence.innerText = ''
            // remedy.innerText = ''

            // data.results.forEach(recall => {  //loop through all the recalls
            //     const p = document.createElement('p') //create a paragraph
            //     p.innerText = recall.Summary //adding the summary to the paragraph
            //     document.querySelector('#recall-summary').appendChild(p) //add the paragraph to the recall summary section

            //     p.innerText = recall.Component
            //     document.querySelector('#fault-details').appendChild(p)

            //     p.innerText = recall.Consequence
            //     document.querySelector('#consequence').appendChild(p)

            //     p.innerText = recall.Remedy
            //     document.querySelector('#remedy').appendChild(p)
            // });

        })
}