const addCustomerButton = document.getElementById("addCustomer");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const customers = [];
function addCustomer () {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const destination = document.getElementById("destination").value;

    if (name && gender && age && destination) {
      patients.push({ name, gender: gender.value, age, destination });
      resetForm();
      generateReport();
    }
  }
  function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("destination").value = "";
  }
  function generateReport() {
    const numCustomers= customers.length;
    const destinationsCount = {
      Angkor_wat_Cambodia: 0,
      Bora_Bora_Indonesia: 0,
      Copacabana_Beach_Brazil: 0, 
      Kyoto_Japan: 0, 
      Melbourne_Australia: 0,
      Rio_de_janeiro_Brazil: 0, 
      Sao_Paulo_Brazil: 0, 
      Sydney_Australia: 0, 
      Taj_Mahal_India: 0,
      Tokyo_Japan: 0, 
    };
    const genderDestinationsCount = {
      Male: {
        Angkor_wat_Cambodia: 0,
        Bora_Bora_Indonesia: 0,
        Copacabana_Beach_Brazil: 0, 
        Kyoto_Japan: 0, 
        Melbourne_Australia: 0,
        Rio_de_janeiro_Brazil: 0, 
        Sao_Paulo_Brazil: 0, 
        Sydney_Australia: 0, 
        Taj_Mahal_India: 0, 
        Tokyo_Japan: 0, 
      },

      Female: {
      Angkor_wat_Cambodia: 0,
      Bora_Bora_Indonesia: 0,
      Copacabana_Beach_Brazil: 0, 
      Kyoto_Japan: 0, 
      Melbourne_Australia: 0,
      Rio_de_janeiro_Brazil: 0, 
      Sao_Paulo_Brazil: 0, 
      Sydney_Australia: 0, 
      Taj_Mahal_India: 0, 
      Tokyo_Japan: 0, 
      },
    };

    for (const customer of customers) {
      destinationsCount[customer.destination]++;
      genderDestinationsCount[customer.gender][customer.destination]++;
    }

    report.innerHTML = `Number of customers: ${numCustomers}<br><br>`;
    report.innerHTML += `Destinations Breakdown:<br>`;
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

    fetch('/home/project/Test_13/travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const destination = data.destination.find(item => item.name.toLowerCase() === input);

        if (destination) {
          const amenities = destination.amenities.join(', ');
          const services = destination.services.join(', ');
          const entertainment = destination.entertainment.services;

          resultDiv.innerHTML += `<h2>${destination.name}</h2>`;
          resultDiv.innerHTML += `<img src="${destination.imagesrc}" alt="hjh">`;

          resultDiv.innerHTML += `<p><strong>amenities:</strong> ${amenities}</p>`;
          resultDiv.innerHTML += `<p><strong>services:</strong> ${services}</p>`;
          resultDiv.innerHTML += `<p><strong>entertainment:</strong> ${entertainment}</p>`;
        } else {
          resultDiv.innerHTML = 'Destination not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchDestination);


