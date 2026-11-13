# Project: Construction API - Daylight ☀️

### Goal: A simple front-end app that displays data returned from an api that would be beneficial to someone in the trades 

## Result: A simple daylight app ☀️
- An app that calls two APIs.
- A user inputs their city or address
- The first API fetches the coordinates for that location
- The coordinates are served as a query parameter to the second API 
- The second API serves you sunrise and sunset times. 

## Tech Stack

- **Front end:** HTML, CSS, JavaScript (async/await, Fetch API)
- **APIs:** [Geocodio](https://www.geocod.io/), [Sunrise-Sunset](https://sunrise-sunset.org/api)
- **Hosting:** GitHub Pages

## How to Use the Live App

1. Open the [live app](https://programmingkat.github.io/simple-api-construction/).
2. Enter a city or street address.
3. Click **Submit** to see the location's coordinates and its sunrise and sunset times.


Example of City Search:
<img width="1251" height="539" alt="image" src="https://github.com/user-attachments/assets/1257b815-3a9c-48a3-8153-b826d221b5fe" />
Example of Address Search:
<img width="1254" height="542" alt="image" src="https://github.com/user-attachments/assets/5d3ecd42-6e66-4492-9228-15822053f870" />

## Future improvements
- Make CSS styling changes : change fonts
- Parse ISO 8601 format timestamp and style

