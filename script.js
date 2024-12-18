// script.js

// Define the ideal conditions for each fruit
const fruitConditions = {
    "amla": { ph: 6.79, nitrogen: 55.57, phosphorus: 29.03, potassium: 48.53, rainfall: 772.61, humidity: 71.41, temperature: 24.37 }, 
    "apple": { ph: 5.95, nitrogen: 24.47, phosphorus: 114.44, potassium: 176.21, rainfall: 260.95, humidity: 88.48, temperature: 22.51 }, 
    "bael": { ph: 6.63, nitrogen: 28.80, phosphorus: 14.93, potassium: 29.97, rainfall: 1014.22, humidity: 48.81, temperature: 30.86 }, 
    "banana": { ph: 6.05, nitrogen: 114.50, phosphorus: 78.27, potassium: 69.11, rainfall: 114.22, humidity: 80.29, temperature: 27.10 }, 
    "ber": { ph: 6.91, nitrogen: 77.40, phosphorus: 37.17, potassium: 73.67, rainfall: 394.36, humidity: 49.92, temperature: 31.24 }, 
    "cherry": { ph: 6.91, nitrogen: 27.40, phosphorus: 22.04, potassium: 32.24, rainfall: 887.12, humidity: 65.87, temperature: 21.90 }, 
    "chikoo": { ph: 6.96, nitrogen: 129.05, phosphorus: 75.75, potassium: 75.95, rainfall: 1474.91, humidity: 69.61, temperature: 26.18 }, 
    "coconut": { ph: 5.98, nitrogen: 21.98, phosphorus: 16.93, potassium: 30.59, rainfall: 175.69, humidity: 94.84, temperature: 27.41 }, 
    "custard apple": { ph: 6.61, nitrogen: 39.85, phosphorus: 31.90, potassium: 42.85, rainfall: 998.20, humidity: 49.77, temperature: 27.34 }, 
    "fig": { ph: 6.45, nitrogen: 75.63, phosphorus: 39.60, potassium: 75.80, rainfall: 624.95, humidity: 64.76, temperature: 27.62 }, 
    "grapefruit": { ph: 6.13, nitrogen: 17.40, phosphorus: 12.04, potassium: 22.24, rainfall: 1330.47, humidity: 65.87, temperature: 26.13 }, 
    "grapes": { ph: 6.03, nitrogen: 29.40, phosphorus: 115.10, potassium: 177.18, rainfall: 174.73, humidity: 77.23, temperature: 23.56 }, 
    "guava": { ph: 5.73, nitrogen: 84.00, phosphorus: 49.70, potassium: 44.00, rainfall: 166.66, humidity: 71.42, temperature: 25.21 }, 
    "jackfruit": { ph: 5.86, nitrogen: 51.98, phosphorus: 24.76, potassium: 45.53, rainfall: 1990.20, humidity: 79.40, temperature: 30.50 }, 
    "jamun": { ph: 6.99, nitrogen: 49.00, phosphorus: 27.73, potassium: 49.37, rainfall: 1506.53, humidity: 71.35, temperature: 30.05 }, 
    "kiwi": { ph: 5.91, nitrogen: 17.40, phosphorus: 12.04, potassium: 22.24, rainfall: 1695.06, humidity: 65.87, temperature: 22.70 }, 
    "litchi": { ph: 6.28, nitrogen: 39.85, phosphorus: 30.55, potassium: 41.25, rainfall: 912.20, humidity: 69.47, temperature: 25.64 }, 
    "mango": { ph: 5.80, nitrogen: 23.82, phosphorus: 26.77, potassium: 31.15, rainfall: 103.26, humidity: 52.25, temperature: 30.81 }, 
    "mulberry": { ph: 6.83, nitrogen: 88.03, phosphorus: 29.90, potassium: 61.90, rainfall: 1663.52, humidity: 70.25, temperature: 24.95 }, 
    "muskmelon": { ph: 6.41, nitrogen: 83.74, phosphorus: 16.58, potassium: 44.51, rainfall: 117.18, humidity: 86.12, temperature: 29.16 }, 
    "orange": { ph: 7.02, nitrogen: 19.58, phosphorus: 16.55, potassium: 10.01, rainfall: 110.47, humidity: 92.17, temperature: 22.77 }, 
    "papaya": { ph: 6.69, nitrogen: 50.76, phosphorus: 57.29, potassium: 51.35, rainfall: 144.55, humidity: 90.67, temperature: 32.85 }, 
    "peaches": { ph: 6.98, nitrogen: 30.64, phosphorus: 12.24, potassium: 24.84, rainfall: 756.75, humidity: 58.03, temperature: 21.83 }, 
    "pear": { ph: 6.91, nitrogen: 17.40, phosphorus: 12.04, potassium: 22.24, rainfall: 730.47, humidity: 65.87, temperature: 21.90 }, 
    "persimmon": { ph: 6.68, nitrogen: 25.64, phosphorus: 17.24, potassium: 29.84, rainfall: 865.06, humidity: 68.03, temperature: 19.69 }, 
    "pineapple": { ph: 5.63, nitrogen: 70.18, phosphorus: 31.33, potassium: 82.49, rainfall: 1236.78, humidity: 79.21, temperature: 26.30 }, 
    "plum": { ph: 6.13, nitrogen: 22.40, phosphorus: 17.04, potassium: 27.24, rainfall: 687.12, humidity: 65.87, temperature: 21.13 }, 
    "pomegranate": { ph: 6.39, nitrogen: 25.82, phosphorus: 20.76, potassium: 40.81, rainfall: 197.31, humidity: 81.78, temperature: 23.06 }, 
    "starfruit": { ph: 6.13, nitrogen: 17.40, phosphorus: 12.04, potassium: 22.24, rainfall: 1547.19, humidity: 71.21, temperature: 26.13 }, 
    "strawberry": { ph: 5.99, nitrogen: 73.80, phosphorus: 35.75, potassium: 75.85, rainfall: 665.59, humidity: 65.65, temperature: 21.61 }, 
    "tamarind": { ph: 6.83, nitrogen: 58.57, phosphorus: 25.57, potassium: 49.13, rainfall: 1163.16, humidity: 61.00, temperature: 29.22 }, 
    "watermelon": { ph: 6.48, nitrogen: 95.14, phosphorus: 18.83, potassium: 54.12, rainfall: 127.52, humidity: 81.65, temperature: 25.46 }
};

// Function to calculate the "distance" between user inputs and fruit conditions
function calculateDistance(inputValues, fruitValues) {
    return Math.sqrt(
        Math.pow(inputValues.ph - fruitValues.ph, 2) +
        Math.pow(inputValues.nitrogen - fruitValues.nitrogen, 2) +
        Math.pow(inputValues.phosphorus - fruitValues.phosphorus, 2) +
        Math.pow(inputValues.potassium - fruitValues.potassium, 2) +
        Math.pow(inputValues.rainfall - fruitValues.rainfall, 2) +
        Math.pow(inputValues.humidity - fruitValues.humidity, 2) +
        Math.pow(inputValues.temperature - fruitValues.temperature, 2)
    );
}

// Function to determine the best fruit to grow
function determineBestFruit(inputValues) {
    let closestFruit = null;
    let smallestDistance = Infinity;

    for (const fruit in fruitConditions) {
        const distance = calculateDistance(inputValues, fruitConditions[fruit]);
        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestFruit = fruit;
        }
    }

    return closestFruit;
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Collect user inputs
    const inputValues = {
        ph: parseFloat(document.getElementById('ph').value),
        nitrogen: parseFloat(document.getElementById('nitrogen').value),
        phosphorus: parseFloat(document.getElementById('phosphorus').value),
        potassium: parseFloat(document.getElementById('potassium').value),
        rainfall: parseFloat(document.getElementById('rainfall').value),
        humidity: parseFloat(document.getElementById('humidity').value),
        temperature: parseFloat(document.getElementById('temperature').value),
    };

    // Determine the best fruit to grow
    const bestFruit = determineBestFruit(inputValues);

    // Display the result
    document.getElementById('output-text').innerText = `Under the given conditions, ${bestFruit} should be grown!`;

    const imgElement = document.getElementById('fruit-image');
    imgElement.src = `imgs/${bestFruit}.png`;
    imgElement.alt = bestFruit;
    imgElement.style.display = 'block'; // Ensure the image is visible

    const captionElement = document.getElementById('fruit-caption');
    captionElement.innerText = bestFruit;

    // Show the result page
    document.getElementById('input-page').classList.remove('active');
    document.getElementById('result-page').classList.add('active');
}

/*function goToInputPage() {
    const autoTempCheckbox = document.getElementById('auto-temp');
    const locationInput = document.getElementById('location');
    const temperatureInput = document.getElementById('temperature');

    if (autoTempCheckbox.checked && locationInput.value) {
        // Fetch and set the temperature based on location (replace with actual API call)
        fetchTemperatureForLocation(locationInput.value)
            .then(temperature => {
                if (temperature !== null) {
                    temperatureInput.value = temperature;
                }
            })
            .catch(error => {
                console.error("Error fetching temperature:", error);
                alert("Could not fetch temperature for the given location.");
            });
    }
    document.getElementById('result-page').classList.remove('active');
    document.getElementById('sign-in-page').classList.remove('active');
    document.getElementById('input-page').classList.add('active');
}
*/

// Initialize the first page as active
document.getElementById('sign-in-page').classList.add('active');

// Add event listener to the form submission
document.getElementById('data-form').addEventListener('submit', handleSubmit);

// Function to get the device location
function getDeviceLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error); // Reject the promise on error
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser.")); // Reject if geolocation is not supported
      }
    });
  }

// Function to show the position in the location input
function showPosition(position) {
    const locationInput = document.getElementById("location");
    locationInput.value = `${position.coords.latitude}, ${position.coords.longitude}`;
}

// Function to handle geolocation errors
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

const geminiApiKey = "AIzaSyDgrr-I8EnJZ4YBTOBj-WDQP68drDHGT3I"; 

async function fetchMedianTemperatureGemini(latitude, longitude) {
    const prompt = `Convert this location to its city name: ${latitude}, ${longitude}. What is the average yearly median temperature in Celsius for that location? Respond only with the numerical value without the unit.`;
  
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt,
            }],
          }],
        }),
      });
  
      const data = await response.json();

      console.log("Gemini API Response:", data);

      if (data.error) {
        throw new Error(`Gemini API Error: ${data.error.message} (Code: ${data.error.code})`);
      }
  
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        const temperature = parseFloat(data.candidates[0].content.parts[0].text);
        if (!isNaN(temperature)) {
          return temperature;
        } else {
          throw new Error("Invalid temperature value received from Gemini API.");
        }
      } else {
        throw new Error("Invalid response format from Gemini API.");
      }
    } catch (error) {
      console.error("Error fetching temperature from Gemini:", error);
      throw new Error("Failed to fetch temperature from Gemini API.");
    }
  }

  async function fetchAverageRainfallGemini(latitude, longitude) {
    const prompt = `Convert this location to its city name: ${latitude}, ${longitude}. What is the average yearly rainfall in mm for the city at that location? Respond only with the numerical value without units.`;
  
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt,
            }],
          }],
        }),
      });
  
      const data = await response.json();

      console.log("Gemini API Response:", data);

      if (data.error) {
        throw new Error(`Gemini API Error: ${data.error.message} (Code: ${data.error.code})`);
      }
  
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        const rainfall = parseFloat(data.candidates[0].content.parts[0].text);
        if (!isNaN(rainfall)) {
          return rainfall;
        } else {
          throw new Error("Invalid rainfall value received from Gemini API.");
        }
      } else {
        throw new Error("Invalid response format from Gemini API.");
      }
    } catch (error) {
      console.error("Error fetching rainfall from Gemini:", error);
      throw new Error("Failed to fetch rainfall from Gemini API.");
    }
  }

  async function fetchAverageHumidityGemini(latitude, longitude) {
    const prompt = `Convert this location to its city name: ${latitude}, ${longitude} without outputting the name. What is the average yearly humidity percentage for the city at that location? Respond with only the numerical value.`;
  
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });
  
      const data = await response.json();

      console.log("Gemini API Response:", data);

      if (data.error) {
        throw new Error(`Gemini API Error: ${data.error.message} (Code: ${data.error.code})`);
      }
  
      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts.length > 0
      ) {
        const humidity = parseFloat(data.candidates[0].content.parts[0].text);
        if (!isNaN(humidity)) {
          return humidity;
        } else {
          throw new Error("Invalid humidity value received from Gemini API.");
        }
      } else {
        throw new Error("Invalid response format from Gemini API.");
      }
    } catch (error) {
      console.error("Error fetching humidity from Gemini:", error);
      throw new Error("Failed to fetch humidity from Gemini API.");
    }
  }

  async function geocodeLocation(location) {
    const prompt = `What are the coordinates of ${location}? Respond only in this format: latitude, longitude. Respond with only the numerical values separated by a comma.`;
  
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });
  
      const data = await response.json();

      console.log("Gemini API Response:", data);

      if (data.error) {
        throw new Error(`Gemini API Error: ${data.error.message} (Code: ${data.error.code})`);
      }
  
      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts.length > 0
      ) {
        const values = data.candidates[0].content.parts[0].text.split(",");
        latitude = values[0].trim();
        longitude = values[1].trim();
        if (!isNaN(latitude) || !isNaN(longitude)) {
          return {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          };
        } else {
          throw new Error("Invalid coordinate values received from Gemini API.");
        }
      } else {
        throw new Error("Invalid response format from Gemini API.");
      }
    } catch (error) {
      console.error("Error fetching coordinates from Gemini:", error);
      throw new Error("Failed to fetch coordinates from Gemini API.");
    }
  }

// Modified goToInputPage function
function goToInputPage() {
    document.getElementById("result-page").classList.remove("active");
    document.getElementById("sign-in-page").classList.remove("active");
    document.getElementById("input-page").classList.add("active");
  }
  
  // Event listener for "Get Temperature Automatically" button
  document.getElementById("get-temp-btn").addEventListener("click", async () => {
    const locationInput = document.getElementById("location");
    const temperatureInput = document.getElementById("temperature");
  
    try {
      let coordinates;
      if (locationInput.value === "USE_DEVICE_LOCATION") {
        coordinates = await getDeviceLocation();
      } else {
        coordinates = await geocodeLocation(locationInput.value);
      }
  
      const medianTemperature = await fetchMedianTemperatureGemini(
        coordinates.latitude,
        coordinates.longitude
      );
      
      temperatureInput.value = medianTemperature.toFixed(1);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  });
// Add event listener to the "Use Device Location" button
//document.getElementById("use-location-btn").addEventListener("click", getDeviceLocation);

document.getElementById("use-location-btn").addEventListener("click", () => {
    const locationInput = document.getElementById("location");
    // Set a special value to indicate that device location should be used
    locationInput.value = "USE_DEVICE_LOCATION";
  });

// Placeholder function to simulate fetching temperature from an API
function fetchTemperatureForLocation(location) {
    // Replace this with an actual API call to a weather service
    // You might need to convert the location to latitude and longitude first
    // This is a placeholder that returns a random temperature between 15 and 35
    // apikey - 81a626ab5d6eda8686c3f2b8415ce984
    return new Promise((resolve) => {
        setTimeout(() => {
            const avgTemperature = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
            resolve(avgTemperature);
        }, 500); // Simulate a small delay
    });
}

document.getElementById("get-rainfall-btn").addEventListener("click", async () => {
    const locationInput = document.getElementById("location");
    const rainfallInput = document.getElementById("rainfall");
  
    try {
      let coordinates;
      if (locationInput.value === "USE_DEVICE_LOCATION") {
        coordinates = await getDeviceLocation();
      } else {
        coordinates = await geocodeLocation(locationInput.value);
      }
  
      const averageRainfall = await fetchAverageRainfallGemini(
        coordinates.latitude,
        coordinates.longitude
      );
      
      rainfallInput.value = averageRainfall.toFixed(1); // Display with 1 decimal place
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  });

  document
  .getElementById("get-humidity-btn")
  .addEventListener("click", async () => {
    const locationInput = document.getElementById("location");
    const humidityInput = document.getElementById("humidity");

    try {
      let coordinates;
      if (locationInput.value === "USE_DEVICE_LOCATION") {
        coordinates = await getDeviceLocation();
      } else {
        coordinates = await geocodeLocation(locationInput.value);
      }

      const averageHumidity = await fetchAverageHumidityGemini(
        coordinates.latitude,
        coordinates.longitude
      );

      humidityInput.value = averageHumidity.toFixed(1); // Display with 1 decimal place
    } catch (error) {
      console.error("Error fetching humidity:", error);
      alert(`Error: ${error.message}`);
    }
  });

