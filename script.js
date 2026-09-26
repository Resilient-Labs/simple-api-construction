const API_URL = "https://phl.carto.com/api/v2/sql";
const RESULT_LIMIT = 20;

const searchForm = document.getElementById("search-form");
const searchTypeSelect = document.getElementById("search-type");
const searchInput = document.getElementById("search-input");
const permitTypeSelect = document.getElementById("permit-type-select");
const messageEl = document.getElementById("message");
const resultsEl = document.getElementById("results");

// permit type gets a dropdown instead of the text box since nobody knows the exact names
searchTypeSelect.addEventListener("change", function () {
  const isPermitType = searchTypeSelect.value === "permittype";
  searchInput.hidden = isPermitType;
  permitTypeSelect.hidden = !isPermitType;

  if (searchTypeSelect.value === "address") {
    searchInput.placeholder = "e.g. 1900 MARKET ST";
  } else {
    searchInput.placeholder = "e.g. EP-2024-003069";
  }
});

// ---------- user input ----------
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchType = searchTypeSelect.value;
  let searchValue;
  if (searchType === "permittype") {
    searchValue = permitTypeSelect.value;
  } else {
    // data is all caps, so uppercase whatever they typed
    searchValue = searchInput.value.trim().toUpperCase();
  }

  console.log("Search params:", { searchType, searchValue });

  if (searchValue === "") {
    showMessage("Please enter something to search for.", true);
    resultsEl.innerHTML = "";
    return;
  }

  searchPermits(searchType, searchValue);
});

// ---------- building the SQL query ----------
function buildQuery(searchType, searchValue) {
  // double up single quotes so an address like O'NEILL doesn't break the SQL
  const safeValue = searchValue.replaceAll("'", "''");

  let whereClause;
  if (searchType === "address") {
    // % on both sides so "MARKET ST" finds any house number on Market
    whereClause = `address LIKE '%${safeValue}%'`;
  } else if (searchType === "permitnumber") {
    whereClause = `permitnumber = '${safeValue}'`;
  } else {
    whereClause = `permittype = '${safeValue}'`;
  }

  // NULLS LAST - otherwise permits with no issue date show up first
  return `SELECT permitnumber, address, zip, permittype, permitdescription,
    typeofwork, commercialorresidential, status, permitissuedate, approvedscopeofwork
    FROM permits
    WHERE ${whereClause}
    ORDER BY permitissuedate DESC NULLS LAST
    LIMIT ${RESULT_LIMIT}`;
}

// ---------- fetch ----------
async function searchPermits(searchType, searchValue) {
  const query = buildQuery(searchType, searchValue);
  const url = `${API_URL}?q=${encodeURIComponent(query)}`;

  console.log("SQL query:", query);
  console.log("Request URL:", url);

  showMessage("Searching...", false);
  resultsEl.innerHTML = "";

  try {
    const response = await fetch(url);
    console.log("HTTP status:", response.status);

    // CARTO sends back {"error": [...]} with a 400 when the SQL is bad
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      throw new Error("The API sent back something that wasn't JSON.");
    }
    console.log("Response data:", data);

    if (!response.ok) {
      const apiError = data.error ? data.error.join(", ") : "unknown error";
      throw new Error(`API request failed (${response.status}): ${apiError}`);
    }

    if (!Array.isArray(data.rows)) {
      throw new Error("Unexpected response - no rows in the data.");
    }

    // ---------- processing the response ----------
    if (data.rows.length === 0) {
      showMessage("No permits found for that search.", false);
      return;
    }

    showMessage(`Showing ${data.rows.length} most recent permit(s).`, false);
    renderResults(data.rows);
  } catch (error) {
    // ---------- errors ----------
    console.error("Permit search failed:", error);
    showMessage(`Something went wrong: ${error.message}`, true);
  }
}

// ---------- rendering ----------
function renderResults(permits) {
  permits.forEach(function (permit) {
    const permitDiv = document.createElement("div");
    permitDiv.className = "permit";

    let fullAddress = permit.address;
    if (permit.address && permit.zip) {
      fullAddress = `${permit.address}, ${permit.zip}`;
    }

    addLine(permitDiv, "Permit #", permit.permitnumber);
    addLine(permitDiv, "Address", fullAddress);
    addLine(permitDiv, "Type", permit.permittype);
    addLine(permitDiv, "Description", permit.permitdescription);
    addLine(permitDiv, "Work", permit.typeofwork);
    addLine(permitDiv, "Residential/Commercial", permit.commercialorresidential);
    addLine(permitDiv, "Status", permit.status);
    addLine(permitDiv, "Issued", formatDate(permit.permitissuedate));
    addLine(permitDiv, "Scope of work", permit.approvedscopeofwork);

    resultsEl.appendChild(permitDiv);
  });
}

// swaps null/empty for "Not listed" so the page never says null or undefined
function addLine(parentDiv, label, value) {
  const line = document.createElement("p");
  const labelEl = document.createElement("strong");
  labelEl.textContent = `${label}: `;
  line.appendChild(labelEl);
  // textContent instead of innerHTML since this text comes from the API
  line.append(value ? value : "Not listed");
  parentDiv.appendChild(line);
}

function formatDate(dateString) {
  if (!dateString) {
    return null;
  }
  // dates come back in UTC, Philly time keeps them from showing a day early
  return new Date(dateString).toLocaleDateString("en-US", { timeZone: "America/New_York" });
}

function showMessage(text, isError) {
  messageEl.textContent = text;
  messageEl.className = isError ? "error" : "";
}
