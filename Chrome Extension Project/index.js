let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const clearBtn = document.getElementById("clear-btn");
const ulEl = document.getElementById("ul-el");
const tabBtn = document.getElementById("tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
let listItems = "";

// If localStorage isn't empty
if (leadsFromLocalStorage) {
  // myLeads is now equal to saved value pair from localStorage
  myLeads = [...leadsFromLocalStorage];
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs[0].url)
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  listItems = "";
  for (let i = 0; i < leads.length; i++)
    listItems +=
      `
  <li>
  <a href="${leads[i]}" target="_blank">${leads[i]}</a>
  </li>
  `;
  ulEl.innerHTML = listItems;
}


// Clear Button Function
clearBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  listItems = "";
  myLeads = [];
  ulEl.innerHTML = listItems;
});

// Save Input Function
inputBtn.addEventListener("click", function () {
  // Pushing the input value to the myLeads array.
  myLeads.push(inputEl.value);
  inputEl.value = "";
  // Saving the myLeads array in local storage but turns into a string 1st. As localStorage only accepts strings.
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  // Running the function that shows shows the JS in the HTML
  render(myLeads);
});

