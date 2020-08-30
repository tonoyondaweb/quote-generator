const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


// Get Quote from API
async function getQuote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // Check if Author field is blank and replace it with 'Unknown'
    if (data.quoteAuthor === '') {
        authorText.innerText = 'Unknown';
      } else {
        authorText.innerText = data.quoteAuthor;
      }
      // Dynamically reduce font size for long quotes
      if (data.quoteText.length > 120) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote');
      }

        quoteText.innerText = data.quoteText;
    } catch (error) {
        getQuote();
    }
}

//tweet quote
function tweetQuote(){
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?${quote}-${author}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On load
getQuote();
