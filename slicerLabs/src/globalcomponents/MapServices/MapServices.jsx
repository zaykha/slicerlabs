// // Function to fetch address details based on postal code
// export const getAddressDetailsByPostalCode = async (postalCode) => {
//     try {
//       const response = await axios.get(
//         `https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${postalCode}&token=${apiToken}`
//       );

//       const address = response.data;
//       // 'address' will contain the address details for the given postal code
//       return address;
//     } catch (error) {
//       console.error("Error fetching address details:", error);
//       return null;
//     }
//   };

import { createAsyncThunk } from "@reduxjs/toolkit";


const apiTokenforOneMap = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NTMyYWViMTE3MDAyY2U0YmRlMThiYmRkN2U2ZWU5MyIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC0xMjIzNjk4OTkyLmFwLXNvdXRoZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tL2FwaS92Mi91c2VyL3Bhc3N3b3JkIiwiaWF0IjoxNjkwMTk5MDM0LCJleHAiOjE2OTA0NTgyMzQsIm5iZiI6MTY5MDE5OTAzNCwianRpIjoiTFhiSk05ajQzUjNzN2UyayIsInVzZXJfaWQiOjE0OSwiZm9yZXZlciI6ZmFsc2V9.hRkko29tvd4gk7oz_HlUu4MA-sFFz8d_TeKlifJpHUE"
// Define your reverse geocode function that makes the API request
const reverseGeocode = async (postalCode) => {
  const url = `https://developers.onemap.sg/commonapi/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  console.log(data)
  
  if (!data.results || data.results.length === 0) {
    throw new Error("No address found with the provided postal code");
  }
  return data.results;
};

// Create the createAsyncThunk for fetching address details
export const fetchAddressDetails = createAsyncThunk(
  "address/fetchAddressDetails",
  async (postalCode, { rejectWithValue }) => {
    console.log(postalCode)
    try {
      const results = await reverseGeocode(postalCode);
      return results; // Return the relevant data from the response
    } catch (error) {
      // The OneMap API does not use error.response.data, so we can just return the error message directly
      console.log(error.message)
      return  rejectWithValue(error.message);
    }
  }
);

// Assuming you have already fetched the coordinates (latitude and longitude) of the two addresses using the Reverse Geocode API or any other method.

// Function to calculate the distance between two points using the Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance in kilometers
};

// Example of using the OneMap Routing API to calculate distance
export const calculateDistanceWithOneMap = async (
  startCoordinates,
  endCoordinates,
  routeType,
  date,
  time,
  mode,
  maxWalkDistance,
  numItineraries
) => {
  // Encode the start and end coordinates in the request URL
  const encodedStart = encodeURIComponent(startCoordinates);
  const encodedEnd = encodeURIComponent(endCoordinates);

  // Construct the API request URL with the required query parameters
  const url = `https://developers.onemap.sg/publicapi/routingsvc/route?start=${encodedStart}&end=${encodedEnd}&routeType=${routeType}&date=${date}&time=${time}&mode=${mode}&maxWalkDistance=${maxWalkDistance}&numItineraries=${numItineraries}`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiTokenforOneMap,
      },
    });
    const data = await response.json();
    console.log(data)
    // Check if the API call was successful and there is a valid route
    if (data.status === "OK" && data.route_geometry) {
      // Calculate the distance from the route information
      const distance = data.route_summary.total_distance / 1000; // Convert from meters to kilometers
      return distance;
    } else {
      throw new Error(
        "Unable to calculate distance. Please check the addresses."
      );
    }
  } catch (error) {
    throw new Error("Error calculating distance. Please try again later.");
  }
};
// export const calculateDistanceWithOneMap = (
//   startCoordinates,
//   endCoordinates,
//   routeType,
//   date,
//   time,
//   mode,
//   maxWalkDistance,
//   numItineraries,
//   apiToken
// ) => {
//   return new Promise((resolve, reject) => {
//     // Encode the start and end coordinates in the request URL
//     const encodedStart = encodeURIComponent(startCoordinates);
//     const encodedEnd = encodeURIComponent(endCoordinates);

//     // Construct the API request URL with the required query parameters
//     const url = `https://www.onemap.gov.sg/api/public/routingsvc/route?start=${encodedStart}&end=${encodedEnd}&routeType=${routeType}&date=${date}&time=${time}&mode=${mode}&maxWalkDistance=${maxWalkDistance}&numItineraries=${numItineraries}`;

//     // Create a new XMLHttpRequest object
//     const xhr = new XMLHttpRequest();

//     // Set the request mode to 'no-cors'
//     xhr.open("GET", url, true);
//     xhr.setRequestHeader("Authorization", apiToken);
//     xhr.withCredentials = true;

//     // Listen for the 'load' event to handle the response
//     xhr.addEventListener("load", function () {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         const response = JSON.parse(xhr.responseText);
//         // Check if the API call was successful and there is a valid route
//         if (response.status === "OK" && response.route_geometry) {
//           // Calculate the distance from the route information
//           const distance = response.route_summary.total_distance / 1000; // Convert from meters to kilometers
//           resolve(distance);
//         } else {
//           reject(new Error("Unable to calculate distance. Please check the addresses."));
//         }
//       } else {
//         reject(new Error("Error calculating distance. Please try again later."));
//       }
//     });

//     // Listen for the 'error' event in case of network errors
//     xhr.addEventListener("error", function () {
//       reject(new Error("Error calculating distance. Please try again later."));
//     });

//     // Send the request
//     xhr.send();
//   });
// };


// // Usage example:
// const startCoordinates = "1.234567,1.234567"; // Replace with the actual latitude and longitude of the starting address
// const endCoordinates = "2.345678,2.345678"; // Replace with the actual latitude and longitude of the ending address

// try {
//   const distance = await calculateDistanceWithOneMap(
//     startCoordinates,
//     endCoordinates
//   );
//   console.log("Distance between the addresses:", distance, "km");
// } catch (error) {
//   console.error(error.message);
// }
