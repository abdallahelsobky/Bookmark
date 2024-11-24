let siteNameInput = document.getElementById("bookmarkName");

let siteURLInput = document.getElementById("siteURL");
let error = document.getElementById("error");
let tableBody = document.getElementById("bodyTable");
let siteList = JSON.parse(localStorage.getItem("sites")) || [];
let sumbitBtn = document.getElementById("sumbitBtn");

let siteNameRegex = /^[A-Z][a-z0-9]{3,}$/;
let siteURLRegex =
  /^(https?:\/\/)?(www\.)?(web\.)?[a-z0-9]{3,}\.(com|net|dev)\/?$/;
displayAllSites();

function validate(regex, input) {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  }
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
  return false;
}

function sumbitLink() {
  if (
    validate(siteNameRegex, siteNameInput) &&
    validate(siteURLRegex, siteURLInput)
  ) {
    let site = {
      siteName: siteNameInput.value,
      siteURL: siteURLInput.value,
    };
    siteList.push(site);
    console.log(siteList);
    localStorage.setItem("sites", JSON.stringify(siteList));
    displaySite(siteList.length - 1);
    clearForm();
  } else {
    error.classList.remove("d-none");
  }
}

function displaySite(index) {
  let numberofsite = index + 1;

  let container;
  container = ` <tr>
            <th scope="row">${numberofsite}</th>
            <td class="pt-3 fw-medium">${siteList[index].siteName}</td>
            <td>
              <button class="btn visit py-2" onclick="visit(${index})">
                
                  <i class="fa-solid fa-eye"></i> Visit
                
              </button>
            </td>
            <td>
              <button class="btn delete py-2"   type="button" onclick="Delete(${index})">
                
                  <i class="fa-solid fa-trash"></i> Delete
              </button>
            </td>
              
            
          </tr> `;
  tableBody.innerHTML += container;
}

function displayAllSites() {
  for (let i = 0; i < siteList.length; i++) {
    displaySite(i);
  }
}
function Delete(index) {
  tableBody.innerHTML = "";
  siteList.splice(index, 1);

  localStorage.setItem("sites", JSON.stringify(siteList));
  displayAllSites();
}

function clearForm() {
  siteURLInput.value = "";
  siteURLInput.classList.remove("is-valid");
  siteNameInput.value = "";
  siteNameInput.classList.remove("is-valid");
}
function closeLayer() {
  error.classList.add("d-none");
}

function visit(index) {
  window.open(siteList[index].siteURL);
}
