document.getElementById('btn').addEventListener('click', getJob)

function getJob() {

    const API_KEY = 'sk-wl-api01-sHy7AKdOT9WKd94qoZ0Cs_UYRYcKfEL7FSbNi3sWLAaDizqoPTO3ae0g5agwjqcVWD-9YWwU-V0IhMd5ylKtemgCejNBlSNr'

    const job = document.querySelector('#enter').value
    // const loc = document.querySelector('#location').value
    const url = `https://api.worklittle.com/jobs?q=${encodeURIComponent(job)}&location=US`

    fetch(url, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)

       

        const topThree = data.data.slice(0, 3)

        document.querySelector('.description').innerText = topThree.map(job => job.title).join('\n')
        document.querySelector('.skills').innerHTML = topThree.map(job => `<a href="${job.apply_url}" target="_blank">Apply Here</a>`).join('<br>')
        // document.querySelector('.tools').src = data.company.logo_url
        const salaries = topThree.map(job => {
        return job.salary?.display ?? 'Salary not listed'
    })

        document.querySelector('.pay').innerText = salaries.join('\n')

    })
    .catch(err => {
        console.log(err)
    })
}

