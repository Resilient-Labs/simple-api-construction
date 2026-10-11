# Seattle Construction Permit Finder

A web app that searches Seattle building permits by ZIP code using
the City of Seattle’s public data API.

<img width="430" height="267" alt="Construction API" src="https://github.com/user-attachments/assets/834c8b0e-01dd-4563-9649-03279e38ef94" />

## Features

- Searches permits by Seattle ZIP code.
- Requests up to 10 matching permits.
- Displays the address, permit number, class, status, description,
  and issue date.
- Clears previous results when a new search returns.

## Built With

- HTML
- CSS
- JavaScript
- Fetch API
- Seattle Open Data API

## How to Run

1. Download or clone this repository.
2. Open index.html in your browser.
3. Enter a Seattle ZIP code, such as 98101 or 98102.
4. Click Search to request matching permits.

An internet connection is required. No Node.js server is needed.

## How It Works

JavaScript reads the ZIP code and sends a request to the Seattle
Open Data API. The request filters records by the originalzip field
and limits the response to 10 records.

The app converts the response to JSON, loops through the permits,
and adds their details to the results section.

## Project Files

- index.html — page structure and search controls
- CSS/construction.css — page styling
- JS/construction.js — API requests and results display
- README.md — project documentation

## Current Limitations

- Results are limited to 10 permits per search.
- The app does not currently display loading or no-results messages.
- Request errors are logged in the browser console.
- ZIP code input is not validated.

## What I Practiced

- Requesting data from a public API.
- Working with promises and JSON.
- Handling button clicks.
- Updating the page with JavaScript.
- Filtering API results using query parameters.

## Author

Sushana Thomas
