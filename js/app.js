let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const directory = document.getElementById("directory");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content")


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
const fetchData = url =>{
    return fetch(url)
            .then(checkStatus)
            .then(response => response.json())
            .catch(err => console.log("Looks like there was a problem receiving  api data.", err))
}

//Checks the 
function checkStatus(res){
    if(res.ok){
      return Promise.resolve(res)
    }else {
        generateErrorMsg();
      return Promise.reject(new Error(response.statusText))
    }
  }


//Api call
fetchData(urlAPI)
.then(data => generateEmployeeHTML(data.results))


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

//Create the employee list seen on page on load
const generateEmployeeHTML = (data) => {
    employees = data;
    let html = "";
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        html += `<li class="employee" data-index=${index}>
                                    <a href="#">
                                        <img class="img-responsive" src="${picture.large}" alt="Start up employee ${name.first} ${name.last}">
                                    <div class="caption">
                                        <h3>${name.first} ${name.last}</h3>
                                        <p>${email}</p>
                                        <p>${city}</p>
                                    </div>
                                </a>
                </li>`  ;   
    });
    directory.innerHTML = html;
}


//Generate modal
const generateModal = (index) =>{
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    // Format birthdate
    let date = new Date(dob.date);
    let birthday =  ('0' + date.getDate()).slice(-2) + '/'
    + ('0' + (date.getMonth()+1)).slice(-2) + '/'
    + date.getYear();
    let html = `
                <img class="img-responsive" src="${picture.large}" alt="${name.first} ${name.last}">
            <div class="name">
                <h3>${name.first} ${name.last}</h3>
                <p>${email}</p>
                <p>${city}</p>
            </div>
            <div class="address">
                <P>${phone}</P>
                <P>${street.number} ${street.name} ${state} ${postcode}</P>
                <P>Birthday: ${birthday}</P>
            </div>
        </section>`;
    overlay.classList.remove("hidden");
    modalContent.innerHTML = html;
}



//Create error message html seen if the api data fails to load
const generateErrorMsg = () => {
    const employeesSection = document.getElementById("employees");
    const msg = `
        <div class="error-msg">
            <h2>Error</h2>
            <p>There was a problem receiving employee data. Please try again later.</p>
        </div>
    `;
    employeesSection.innerHTML = msg;

}

// ------------------------------------------
//  Event Handlers
// ------------------------------------------

const handleModalClose = evt => {
    const close = evt.target;
    if(close.tagName === "BUTTON"){
        if(close.classList.contains("close")){
            overlay.classList.add("hidden");
  
        }
    }
    
}




// ------------------------------------------
//  Event Listeners
// ------------------------------------------
directory.addEventListener('click', evt => {

// make sure the click is not on the gridContainer itself
    if (evt.target !== directory) {
    // select the card element based on its proximity to actual element clicked
    const employee = evt.target.closest(".employee");
    const index = employee.getAttribute('data-index');
    generateModal(index);
    }
});

modalContainer.addEventListener("click", handleModalClose);





