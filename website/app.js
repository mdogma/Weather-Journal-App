/* Global Variables */

// OpenWeather API

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=c71dd1e8820c41faaa0bce772191a003';

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();

// Divs to populate with the information fetched

const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');

// Error Div that will be created to display an error message to the user if Zip Code is incorrect

const errorDiv = document.createElement('div');
const zipDiv = document.querySelector('.zip');


// Generate button

document.getElementById('generate').addEventListener('click', performAction);

function performAction(){

const newCity =  document.getElementById('zip').value;
const contentTyped = document.getElementById('feelings').value; 
    
getCity(baseURL,newCity, apiKey)

    .then (function(data){
        const degrees = (data.main.temp);
        const place = (data.name)
        const newEntry = {temp: degrees, name : place, date: newDate, feeling: contentTyped}
        console.log(data)
        postData('/postRoute', newEntry)
    
    // Once we get all our data, we can populate our empty divs 
    
    .then(
        function() {
            updateUI()
            })
    })
};

// Async GET request

const getCity = async (baseURL, zip, key)=>{

    const weatherData = await fetch(baseURL+zip+key)
    try {
      const data = await weatherData.json();
      
      // If Zip Code is wrong
      if (!weatherData.ok) {
          console.log('ZIP Code could not be found')
          zipDiv.appendChild(errorDiv);
          errorDiv.classList.add('zipError');
          errorDiv.innerHTML = '<p>ZIP Code could not be found<p>';
      }

      return data;
    }  
    
     catch (error) {
         console.log("Error", error);
    }
}

// Async POST request

const postData = async(url = '', data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("Error", error);
    }
}

// Update UI dynamically by adding information fetched as strings inside our empty divs

const updateUI = async () => {
    const request = await fetch('/getRoute');
    try {
        const weatherData = await request.json();
        dateDiv.innerHTML = `Date : ${weatherData.date}`;
        tempDiv.innerHTML = `${weatherData.name}, ${weatherData.temp}°`;
        contentDiv.innerHTML = `${weatherData.feeling.charAt(0).toUpperCase() + weatherData.feeling.slice(1)}`;
    } catch (error) {
        console.log("Error", error);
    }
}
