// Import required modules
const express = require('express'); // Express is a web framework for Node.js
const axios = require('axios'); // Axios is used to make HTTP requests
const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Set the port for the server

// Replace 'YOUR_YELP_API_KEY' with your actual Yelp API Key
const YELP_API_KEY = 'Y0hBS1VlxiFzKG08VbMqt_-FNa25crZt-gsh01Hl_BV_37fqsHRTp4xIWBYf6ju0zYIk-qI_RBwxceJ07Q0gBtwnAJGvn6Qx2lirYSvt0GvufKMbabjTVsGu_4nXZnYx';

// Define a route to handle GET requests to /api/search_restaurants
app.get('/api/search_restaurants', async (req, res) => {
    const query = req.query.query; // Get the search term from the request's query parameters
    const location = 'San Francisco'; // Set a default location; you can change or make it dynamic

    try {
        // Make a GET request to the Yelp API using Axios
        const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}` // Use backticks for string interpolation
            },
            params: {
                term: query, // Search term (restaurant name or keyword)
                location: location, // Location to search in
                limit: 10 // Limit the number of results to 10
            }
        });

        // Send the Yelp API response back to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching from Yelp API:', error); // Log errors to the console
        res.status(500).json({ error: 'Failed to fetch data from Yelp API' }); // Send error response to client
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
