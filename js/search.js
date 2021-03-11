// DOM Nodes
const search = document.getElementById("search");



//Event Handlers

// Search function to filter employees
const handleSearch = evt =>{
    let search = evt.target.value.toLowerCase();
    const employees = document.querySelectorAll(".employee");
    employees.forEach(employee => {
        let employeeName = employee.firstElementChild.lastElementChild.firstElementChild.textContent.toLowerCase();
        if(employeeName.includes(search)){
            employee.style.display= "block";
        } else {
            employee.style.display= "none";
        }
    });
}


//Event listeners
search.addEventListener("keyup", handleSearch);
search.addEventListener("search", handleSearch);