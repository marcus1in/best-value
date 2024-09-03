async function fetchRestaurants(query) {
    try {
        const response = await fetch(`/api/search_restaurants?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error("Failed to fetch data from server");
        }

        const data = await response.json();

        displaySuggestions(data.businesses);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
}