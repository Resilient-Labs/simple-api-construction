# 👷‍♂️ &nbsp;Trade Cost Estimator

A cost estimator for construction and home improvement jobs. You enter a zip code and pick a trade, like plumbing, flooring, or a kitchen remodel, and it shows the low, average, and high cost for that job in your area. It uses the EstimationPro.ai Construction Cost API.

**Live demo:** https://construction-api-project.netlify.app

[![Screenshot-2026-09-30-at-3-40-40-AM.png](https://i.postimg.cc/mZzXhKDP/Screenshot-2026-09-30-at-3-40-40-AM.png)](https://postimg.cc/c6WMb9fW)

## How It's Made:

**Tech used:**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

The page has a zip code input and a dropdown with 10 trades to choose from. When you click search, I take the zip code and the value of the selected trade and put both into the API URL.

The API sends back the location and a list of cost items for that trade. I take the first item and show its description, plus the low, typical, and high price per unit (like per square foot).

## Optimizations

Things I want to improve:

- The API sends back more than one cost item for each trade, but right now I only show the first one. I'd like to show all of them.
- Format the prices with commas so bigger numbers are easier to read.
- Check that the zip code is 5 numbers before searching.

## Lessons Learned:

This was my first time using a dropdown (`<select>`) to build an API request. I learned that the `value` I set on each `<option>` is what gets sent, so it has to match exactly what the API expects, like `kitchen-remodel` instead of "Kitchen Remodel."

Data from the [EstimationPro.ai Construction Cost API](https://estimationpro.ai/api).
