# Job Finder

Type a job keyword, get the top three matching US listings with titles, apply links, and salary info.

![Job Finder screenshot](screenshot.jpg)

## How the code works

`getJob()` takes the search term, encodes it with `encodeURIComponent` so multi-word queries don't break the URL, and fetches the WorkLittle jobs API with a Bearer token. It slices the top three results and maps each one into the page: titles go into `.description`, "Apply Here" links get built from each job's `apply_url` into `.skills`, and salaries land in `.pay`.

The line I'm proudest of is the salary render: `job.salary?.display ?? 'Salary not listed'`. Not every listing has pay data, and without that guard the whole render would crash on the first salary-less job. Optional chaining plus a nullish fallback, one expression, and missing data degrades gracefully instead of exploding. It's a small habit, but it's the difference between code that assumes a perfect API and code that's met a real one.

The hardest part was the API's shape. Three different fields had to be mapped into three different page sections from one response, and the salary field's habit of sometimes not existing meant the render logic needed that fallback from the start.

WorkLittle API, plain JavaScript. My code is on the `answer` branch.
