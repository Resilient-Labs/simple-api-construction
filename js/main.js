//Goal: Build a simple front-end app that displays data returned from an api that would be beneficial to someone in the trades (construction, hvac, plumbing, ect)
//App Goal - Allow user to look up New York building permits by street name

class Display { 
    constructor() { //DOM Elements
        this.message = document.getElementById("message");
        this.permitsSection = document.getElementById("permits-section"); 
        this.permitsList = document.getElementById("permits-list"); 

    }
    showMessage(text) { 
    this.message.textContent = text; 
    }

    showPermits(permits) { 
        this.permitsList.innerHTML = "";

        permits.forEach(permit => { 
            const item = document.createElement("li"); 
            item.textContent = permit.house__+ " " + permit.street_name + ", " + permit.borough + 
            " | Permit type: " + permit.permit_type + " | Issued: " + permit.issuance_date;
            this.permitsList.appendChild(item); 
        }); 
        }

}

class PermitAPI { 
    constructor(display) { 
        this.display = display; 
    }
    search(streetName) { 
        fetch( "https://data.cityofnewyork.us/resource/ipu4-2q9a.json?$q=" + streetName + "&$limit=10")
        .then(res => res.json())
        .then(data => { 
            if (data.length === 0) { 
                this.display.showMessage("No permits found.")
                return;
            }
            this.display.showPermits(data); 
            this.display.showMessage("Permits found:");
            
        })
        
        .catch(() => this.display.showMessage("Could not connect to the API."))
    }
} 

class App  { 
    constructor() { 
        this.display = new Display(); 
        this.permitAPI = new PermitAPI(this.display); 
        this.input = document.getElementById("search-input"); 

        document.getElementById("search-button").addEventListener("click", () => 
            this.search()); 
    }

    search() { 
        const streetName = this.input.value.trim();

        if (streetName === "") { 
            this.display.showMessage("Please enter a street name."); 
            return; 
        }
        this.permitAPI.search(streetName); 
    }



}

new App();