/**
 * author: johnny 

 */



"use strict";

const quoteText = document.getElementById("quote");
const quoteBtn = document.getElementById("quoteBtn");
const allQuotesBtn = document.getElementById("allQuotesBtn");
const quotesList = document.getElementById("quotesList");

async function fetchQuote() {
    try {
        const response = await fetch(`https://api.whatdoestrumpthink.com/api/v1/quotes/random`);
        const data = await response.json();
        quoteText.innerText = `"${data.message}"\n\n- Donald Trump`;
    } catch (error) {
        quoteText.innerText = `Failed to fetch quote. Please try again later.`;
        console.error(`Error fetching quote:`, error);
    }
}

quoteBtn.addEventListener("click", fetchQuote);
fetchQuote();

async function fetchAllQuotes() {
    // Toggle visibility: If quotes exist, clear them
    if (quotesList.innerHTML.trim() !== "") {
        quotesList.innerHTML = ""; // Clear the list
        return; // Stop execution
    }

    try {
        const response = await fetch(`https://api.whatdoestrumpthink.com/api/v1/quotes/`);
        const data = await response.json();

        if (!data.messages || !data.messages.non_personalized) {
            throw new Error("Unexpected API response structure.");
        }

        data.messages.non_personalized.forEach((quote) => {
            const listItem = document.createElement("li");
            listItem.innerText = `"${quote}"\n\n- Donald Trump`;
            quotesList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching all quotes:", error);
    }
}

// Toggle all quotes when button is clicked
allQuotesBtn.addEventListener("click", fetchAllQuotes);



/*https://api.whatdoestrumpthink.com/api/v1/quotes/random*/

/*const response = await fetch(`https://qapi.vercel.app/api/random`);*/
