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

function displaySuggestions(restaurants) {
    const suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.innerHTML = "";

    restaurants.forEach(restaurant => {
        const suggestionItem = document.createElement("div");
        suggestionItem.className = "suggestion-item";
        suggestionItem.textContent = restaurant.name;
        suggestionsDiv.appendChild(suggestionItem);

        suggestionItem.addEventListener("click", () => {
            document.getElementById("search-bar").value = restaurant.name;
            suggestionsDiv.innerHTML = "";
        });
    });
}

document.getElementById("search-bar").addEventListener("input", function() {
    const query = this.value;

    if (query.length > 0) {
        fetchRestaurants(query);
    } else {
        document.getElementById("suggestions").innerHTML = "";
    }
});