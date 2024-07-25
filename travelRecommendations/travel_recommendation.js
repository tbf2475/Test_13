const addCustomerButton = document.getElementById("addCustomer");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const customer = [];
function addCustomer() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const location = document.getElementById("location").value;

    if (name && gender && age && condition) {
      patients.push({ name, gender: gender.value, age, condition });
      resetForm();
      generateReport();
    }
  }
  function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
  }
  function generateReport() {
    const numCustomers= customers.length;
    const destinationsCount = {
      New_York: 0,
      Los_Angeles: 0,
      "North_Carolina": 0,
    };
    const genderConditionsCount = {
      Male: {
        New_York: 0,
        Los_Angeles: 0,
        "North_Carolina": 0,
      },
      Female: {
        New_York: 0,
        Los_Angeles: 0,
        "North Carolina": 0,
      },
    };

    for (const customer of customers) {
      destinationsCount[customer.destination]++;
      genderDestinationsCount[customer.gender][customer.destinations]++;
    }

    report.innerHTML = `Number of customers: ${numCustomers}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const destination in destinationsCount) {
      report.innerHTML += `${destination}: ${destinationsCount[destination]}<br>`;
    }

    report.innerHTML += `<br>Gender-Based Destinations:<br>`;
    for (const gender in genderDestinationsCount) {
      report.innerHTML += `${gender}:<br>`;
      for (const destination in genderDestinationsCount[gender]) {
        report.innerHTML += `&nbsp;&nbsp;${destination}: ${genderDestinationsCount[gender][destination]}<br>`;
      }
    }
  }

addCustomerButton.addEventListener("click", addCustomer);
function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const destination = data.destinations.find(item => item.name.toLowerCase() === input);

        if (destination) {
          const amenities = destinations.amenities.join(', ');
          const services = destination.services.join(', ');
          const entertainment = entertainment.services;

          resultDiv.innerHTML += `<h2>${destination.name}</h2>`;
          resultDiv.innerHTML += `<img src="${destination.imagesrc}" alt="hjh">`;

          resultDiv.innerHTML += `<p><strong>Amenities:</strong> ${amenities}</p>`;
          resultDiv.innerHTML += `<p><strong>Services:</strong> ${services}</p>`;
          resultDiv.innerHTML += `<p><strong>Entertainment:</strong> ${entertainment}</p>`;
        } else {
          resultDiv.innerHTML = 'Destination not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchDestinations);


